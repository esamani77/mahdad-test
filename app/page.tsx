"use client";
import { darkModeAtom, fontSizeAtom, fontSize } from "@/store/userPrefrences";
import { useAtom } from "jotai";

export default function Home() {
  const fontSizeOptions: Record<fontSize, string> = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const [theme, setTheme] = useAtom(darkModeAtom);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);

  return (
    <div
      className={`w-full h-[calc(100dvh-72px)] overflow-y-auto my-9 p-6 ${
        theme ? "bg-black text-white" : "bg-white text-black"
      }  ${fontSizeOptions[fontSize]}`}
    >
      <section>
        <h4> change theme: </h4>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => {
            setTheme(!theme);
          }}
        >
          {theme ? "dark" : "light"}
        </button>
      </section>

      <section>
        <h4> change font size: </h4>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setFontSize(e.target.value as fontSize);
          }}
          className="border p-2"
        >
          {Object.entries(fontSizeOptions).map(([key, value]) => {
            return (
              <option key={key} value={key} selected={fontSize === key}>
                {key}
              </option>
            );
          })}
        </select>
      </section>
    </div>
  );
}
