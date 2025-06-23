
#### 1. Store 구조화 기본 원칙

- `zustand`의 `store`는 `상태(state)`, `Action`, `계산된 값 (Computed Value)`
- 총 세 가지로 나눠서 설계한다.

``` js
const useCountStore = create((get, set) => ({
	count: 0,
	setCount: () => set((state) => ({count: state.count + 1})),
	DoubleCount: () => get().count * 2,
}));
```

- `count` : 상태 state
- `setCount`: 상태를 변경하는 함수, `set()` 이용해서 <br/>
			상태를 안전하게 변경한다.
- `DoubleCount`: `get()` 이용해서, 상태의 파생 데이터를 계산하는 함수

- 이런 식으로 `store`의 역할을 명확하게 구분하면
- 코드의 가독성과 유지 보수가 훨씬 수월해진다.

---

#### 2. 상태 선택 패턴 (Selector)

- `Store`에서 필요한 값만 가져와서 사용할 수 있다.

``` js
import {useCountStore} from "stores";

const Count = useCountStore((state) => state.count);
const setCount = useCountStore((state) => state.setCount);
```

- `Count`의 값이 업데이트가 되면
- 해당 상태(`Count`)를 사용하는 `Component`가 Re-rendering 된다. <br/>
	(해당 상태를 사용하지 않는 `Component`는 Re-render 대상 제외됨)

---

#### 3. 상태 Update

- `set()` 함수를 통해 상태를 직접적으로 수정하지 않고 <br/>
	우회해서 상태를 업데이트 한다. (안전 업데이트)
- `get()` 함수를 통해서 현재 상태를 가져오는 것도 가능하다.
- 이는 상태의 불변성을 유지하는데 도움이 된다.

``` js
const useCountStore = create((get, set) => ({
	setCount: () => set((state) => ({count: state.count + 1})), //O
	setCount: () => set(count + 1) //X
}));
```

- `set(count + 1)`의 형식으로 상태를 업데이트하지 않고
- `set((state) => ({count: state.count + 1}))`의 형식으로 작성 <br/>
	상태를 직접적으로 건드리지 않고, 새로운 값을 `object`로 만들어서 업데이트한다.

- 이는 `zustand`에서 `create()` 통해 생성하는 전역 상태 <br/>
	`store`가 객체 형태의 상태이기 때문에 이를 업데이트하는 `set()` 함수도 <br/>
	객체 형태의 값을 `return`해야 하기 때문에 `set(state + 1)` 식으로 작성하면 안된다.

- 즉, 선언할 때와 똑같이 객체를 기반으로 값을 업데이트를 해줘야 한다.

---

#### 4. 복잡한 상태 구조 다루기

- `React`에선 상태의 변경 여부를 `===` 통해 판단한다.
- 여기서 상태 객체를 직접적으로 수정하면 <br/>
	`React`에서 해당 상태의 변경을 감지하지 못한다.
- 상태 변경을 발생하지 못한다면 당연히 Re-rendering도 되지 않는다.

- 그렇기 때문에 상태의 불변성을 제대로 지켜줘야만 
	상태의 값이 변경되고, 이에 맞춰서 `Re-render`이 문제 없이 진행된다.

- **중첩 객체 업데이트**

``` js
const useProfileStore = create((set, get) => ({
	updatePersonalInfo: (newInfo) => set((state) => ({
		profile: {
			...state.profile,
			personal: {
				...state.profile.personal,
				...newInfo
			}
		}
	}))
}))
```

- **배열 업데이트**

``` js
const useTaskStore = create((set) => ({
	tasks: []
	addTask: (task) => set((state) => ({
		tasks: [...state.tasks, task]
	}))
}))
```

- 배열의 기존 값을 복사하고, spread 연산자를 통해서 기존 값을 분해 전개하고
- 새로 추가한 값을 뒤에 덧붙이는 방식으로 상태의 불변성을 지킨다.

---
