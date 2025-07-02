
#### `Store` 내부에 비동기 함수 정의하는 방식

``` js
import {create} from "zustand";

const useUserStore = create((set) => ({
users: [],
loading: false,
error: null,
fetchUsers: async() => {
	set({loading: true, error: null});
	try {
		const resp = await fetch("api urls");
		const users = await resp.json();
		set({users, loading: false});
	} catch(error){
		set({error: error.message, loading: false});
	}
}
}))
```

- 이런 식으로 작성한 비동기 함수는 `useUserStore().fetchUsers()` <br/>
	형식으로 호출해서 사용한다.

-  이러한 방식이 가지는 장점은 다음과 같다.

``` text
- 상태 관련 로직이 한곳에 집중됨
- 상태 변경 흐름, 캡슐화
- 컴포넌트가 심플해짐 (규모가 작은 프로젝트에 적합함)
```

---

#### 호출 => 외부, 상태 관리 => 내부

- 비동기 관련 `Logic`을 별도의 함수로 관리하고
- `Store`는 상태 관리만 하게 하는 방식

``` js
const useUserStore = create((set) => ({
	users: [],
	loading: false,
	error: null,
	setUsers: (users) => set({users}),
	setLoading: (loading) => set({loading}),
	setErrors: (error) => set({error})
}));

async function fetchUsers(){
	const {setUsers, setLoading, setError} = useUserStore.getState();
	//Store 외부에서 Action을 꺼내와서 상태를 업데이트
	
	setLoading(true);
	setError(null);
	
	try {
		const resp = await fetch("urls");
		const users = await resp.json();
		setUsers(users);
	} catch(error){
		setError(error.message);
	} finally {
		setLoading(false);
	}
}
```

- `getState()`
	- `store` 외부에서 현재 상태를 가져오기 위해 사용하는 함수
	- `store` 외부에서 직접적으로 상태를 읽어야 할 때 사용함
	- `React Hook`은 `Component`의 최상위 level에서만 호출해야 하므로 <br/>
		일반 함수 등지에서 `Store`의 현재 상태를 가져오기 위해 쓰는 방법
	- `useStore()`와는 달리, 상태 값이 업데이트가 되더라도 <br/>
		`Re-rendering`이 발생하지 않는다.

- `get()`과의 차이
	- `get()`은 `create()` 내부에서 상태를 **읽기** 위해 사용함
	- `create` 함수 내에 작성된 함수가 현재 상태를 가져와야 할 때 사용
	- `getState()`는 `Store`의 상태를 외부에서 가져오기 위해 사용함.
	
	- `get()`은 내부에서 상태를 읽고
	- `getState()`는 외부에서 상태를 읽는 함수라는 차이점이 존재한다.


- 이 방식의 특징은 다음과 같다.

``` text
- 상태 업데이트와 API 호출 분리 (일종의 모듈화?)
- 복잡한 로직도 관리하기 용이함
- API 함수 재사용성 높아짐
- 규모가 중 ~ 대형 프로젝트에서 적합한 방식
```

---

#### 정리

| 기준      | `Store` 내부 방식        | 외부 호출 방식                   |
| ------- | -------------------- | -------------------------- |
| 코드 구조   | 단순, 직관적              | 상태 관리, API 호출 분리 => 명확한 구조 |
| 재사용성    | API 호출 내부 => 재사용성 낮음 | API 호출 외부 => 재사용성 높음       |
| 테스트 편의성 | 낮음                   | 높음                         |
| 추천 규모   | 소규모 프로젝트 적합          | 중/대형 프로젝트 적합               |


