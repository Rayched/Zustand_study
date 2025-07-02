

### `Zustand`, `TypeScript` 적용하기

- 아래 코드는 `ts` 파일에서 `store`를 생성한 예제이다.
- 설명을 위해서 별도의 `Type` 설정은 하지 않았다.

``` ts
const useCountStore = create((set) => ({
	Count: 0,
	setCount: () => set((prev) => ({Count: prev.Count + 1}))
	//매개변수 'prev'가 any type일지도 모른다는 경고 메시지가 나온다.
}));
```

- 그냥 `JavaScript`만 썼다면 이런 문제를 보진 않겠지만
- `TypeScript`를 사용하고 있다면 흔히 볼 수 있는 문제이다.

- 이런 문제를 해결하려면 `useCountStore`의 `type`을 지정해주면 된다.

``` ts
interface I_CountStore {
	Count: number;
	setCount: (prev: number) => void;
};
```

- `interface`를 활용해서 `Store`의 `Type`을 만들고
- `React Hook`의 `Type`을 지정하는 것처럼 `<interface_name>` 식으로 작성 <br/>
	해당 `Store`의 `Type`을 지정해주면 해결된다.

``` ts
interface I_CountStore {
	Count: number;
	setCount: (prev: number) => void;
};

const useCountStore = create<I_CountStore>((set) => ({
	Count: 0,
	setCount: () => set((prev) => ({Count: prev.Count + 1}))
}));
```

---

