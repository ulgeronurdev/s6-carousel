import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import path from "path";
import fs from "fs";
import App from "./../App.jsx";
import { data } from "./../data.js";

import MyCarousel from "./../components/MyCarousel";

const pjPath = path.resolve(__dirname, "./../../package.json");
const pkg = JSON.parse(fs.readFileSync(pjPath, "utf-8"));

const appPath = path.resolve(__dirname, "./../App.jsx");
const appCode = fs.readFileSync(appPath, "utf-8");

//
const carouselPath = path.resolve(__dirname, "./../components/MyCarousel.jsx");
const carouselCode = fs.readFileSync(carouselPath, "utf-8");

//

test("reactstrap ve bootstrap paketleri kurulmuş mu?", () => {
  expect(
    pkg.dependencies["reactstrap"] || pkg.devDependencies["reactstrap"]
  ).toBeDefined();
  expect(
    pkg.dependencies["bootstrap"] || pkg.devDependencies["bootstrap"]
  ).toBeDefined();
});

test("App.jsx'e bootstrap css'i dokümantasyondaki gibi import edilmiş mi?", () => {
  expect(appCode.includes("bootstrap/dist/css/bootstrap.min.css")).toBe(true);
});

test("MyCarousel.jsx'de data import edilmiş mi?", () => {
  expect(carouselCode.includes("../data")).toBe(true);
});

test("MyCarousel.jsx'de reactstrap Carousel componenti kullanılmış mı?", () => {
  const { container } = render(<MyCarousel />);
  const thing = container.querySelector(".carousel");
  expect(thing).toBeInTheDocument();
  expect(carouselCode.includes("<Carousel")).toBe(true);
});

test("MyCarousel.jsx'de reactstrap CarouselCaption componenti kullanılmış mı?", () => {
  const { container } = render(<MyCarousel />);
  const thing = container.querySelector(".carousel-caption");
  expect(thing).toBeInTheDocument();
  expect(carouselCode.includes("<CarouselCaption")).toBe(true);
});

test("MyCarousel.jsx'de reactstrap CarouselIndicators componenti kullanılmış mı?", () => {
  const { container } = render(<MyCarousel />);
  const thing = container.querySelector(".carousel-indicators");
  expect(thing).toBeInTheDocument();
  expect(carouselCode.includes("<CarouselIndicators")).toBe(true);
});

test("MyCarousel.jsx'de prev ve next tıklamaları için reactstrap CarouselControl componenti kullanılmış mı?", () => {
  const { container } = render(<MyCarousel />);
  const thing = container.querySelector(".carousel-control-prev");
  const thing2 = container.querySelector(".carousel-control-next");
  expect(thing).toBeInTheDocument();
  expect(thing2).toBeInTheDocument();
  expect(carouselCode.includes("<CarouselControl")).toBe(true);
});

test("App.jsx'de MyCarousel componenti kullanılmış", () => {
  render(<App />);
  const carousel = screen.getByTestId("myCarouselWrapper");

  expect(carousel).toBeInTheDocument();
  expect(appCode.includes("<MyCarousel")).toBe(true);
});

test("İleri-geri butonları ve aşağıdaki slide sayısı butonları doğru sayıda render ediliyor.", () => {
  render(<MyCarousel />);
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(5);
});

test("Sayfa açıldığında verinin ilk elemanı görüntüleniyor mu?", () => {
  const { container } = render(<MyCarousel />);
  const activeItem = container.querySelector(".carousel-item.active");
  const heading = activeItem?.querySelector("h3");
  expect(heading).toHaveTextContent(data[0].title);
});

test("Sonraki butonuna tıklandığında doğru eleman görünüyor mu?", async () => {
  const { container } = render(<MyCarousel />);
  const activeItem = container.querySelector(".carousel-item.active");
  const heading = activeItem?.querySelector("h3");
  expect(heading).toHaveTextContent(data[0].title);
  const user = userEvent.setup();

  const nextButton = container.querySelector(".carousel-control-next");
  await user.click(nextButton);

  await waitFor(() => {
    const newActiveItem = container.querySelector(".carousel-item.active");
    const newHeading = newActiveItem?.querySelector("h3");
    expect(newHeading).toHaveTextContent(data[1].title);
  });
});
