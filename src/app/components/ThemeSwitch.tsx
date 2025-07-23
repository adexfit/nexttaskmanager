"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Image
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAATpJREFUWEfd2L0OgjAQAOBjYmAgYWTm/Z+ERyBsMJIwMDBhqqmitr0/aFEn1NL76B2lNGvbdquqCvI8h5SfdV1hmibI+r7fzEHTNFCWZRLTPM/QdR2YgcmGYdiKorj/kAJlMSb2siwPUF3XsP8j1kh9xhzH8QUyuYqJcsX6AsVC+S7cCTobFcqCF3QWCiuJIOhoFIYx8VDQUSgKhgzSoqgYFkiK4mDYIC6KixGBqCgJRgzCUFKMCuRDaTBq0CfKfNeuGEjzELZAsqNi2mmXL/8H2tdM8pS5CjhZUYcCa1CiGqIEpLRx3SxsECcQp63FsUCSANxzyCBux/t0cM4lgTgd+iZRah8oiNoRNptjD2RSDR2JsQGxPn/jNQi7Ckp6sDbkF8UYmFD63lIWE+NDPUGX2o653IbV1bb0bkvpafuPXKoGAAAAAElFTkSuQmCC"
        height={36}
        width={36}
        sizes="36x36"
        alt="Loading theme toggle"
        priority={false}
      />
    );

  if (theme === "dark") {
    return (
      <button
        className="cursor-pointer rounded-full bg-gray-200 p-2 transition-colors duration-300 dark:bg-gray-800"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-5 w-5 text-blue-400" aria-label="Toggle theme" />
      </button>
    );
  }
  if (theme === "light") {
    return (
      <button
        className="cursor-pointer rounded-full bg-gray-200 p-2 transition-colors duration-300 dark:bg-gray-800"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-5 w-5 text-gray-800" aria-label="Toggle theme" />
      </button>
    );
  }
}
