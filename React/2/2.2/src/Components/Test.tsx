import { atom, useRecoilState } from "recoil";

const testAtom = atom({
  key: "testAtom",
  default: "hello",
});

export default function Test() {
  const [v, setV] = useRecoilState(testAtom);
  return <button onClick={() => setV("world")}>{v}</button>;
}
