

- **`Action`**
	- 상태를 바꾸는 **주체**

---

#### `action`은 매개변수를 받아야 한다.

- `action`에서 필요한 데이터는 항상 외부에서, 매개변수를 통해 받아야 한다.
- 매개변수 없이 내부에서 데이터를 직접적으로 생성하는 방식은 <br/>
	코드가 어떤 식으로 진행될 지를 예측하기 힘들어지고, 테스트하는데 어려움이 생긴다.

- 즉, 유지보수 측면에서 좋은 방식이 아니기 때문에 가급적이면 지양하는 것이 좋다.

``` js
const useToDoStore = create((set, get) => ({
	todos: [],
	
	addToDo: (todo) => set((oldState) => ({
		todos: [...oldState.todos, { todo, completed: false}]
	}))
	
}));
```

---

#### 여러 상태를 `action` 하나로 동시 변경

- 서로 관련된 상태는 하나의 `action`, 같은 `action` 안에서 처리한다.
- 각 상태를 업데이트하는 로직이 흩어지지 않기 때문에 코드가 더 명확해진다.

``` js
const useLoginStore = create((set, get) => ({
	userInfo: {Id: "testId", Name: "testerA", PW: "1q2w3e4r!"},
	isLogin: false,
	error: null,

	/*Login 관련 작업을 처리하는 loginSuccess*/
	loginSuccess: (userInfo) => set(() => ({
		userInfo: {...userInfo},
		isLogin: true,
		error: null
	}))
}))
```


---

#### `action`은 "상태 변경" 집중

- `action`은 단순한 상태 변환하는 역할만 수행해야 한다.
	- `action` 내부에서 `api` 호출하거나
	- `setTimeout()`, 복잡한 조건 분기 등 상태 변환과 관련이 없는
	- 동작은 피하는 것이 좋다.

- api 호출이나 복잡한 로직 등은 다른 함수로 분리해서 처리하는 편을 권장함

---

#### `action` 그룹화 하기

- `store`가 커지면, 그에 맞춰서 `action`의 개수도 늘어난다.
-  이런 경우에는 서로 연관된 `action`끼리 묶어서 그룹화를 하는 것이 좋다.

``` js
const useBoardStore = create((set) => ({
	user: {name: "", isLogin: false},
	posts: [],

	//user와 관련된 action's
	userActions: {
		userLogin: (name) => set({user: {name, isLogin: true}}),
		userLogout: () => set({user: {name: "", isLogin: false}})
	},
	//posts와 관련된 action's
	postActions: {
		addPost: (text) => set((oldState) => ({
			posts: [...oldState.posts, {text}]
		})),
	}
```

- 서로 연관된 기능끼리 묶어두면 코드의 가독성이 향상되고 유지보수하기 수월함
- `useBoardStore.getState().userActions.userLogin("john")`와 같이 작성 <br/>
	그룹화를 해둔 `action`을 사용할 수 있다.

---

