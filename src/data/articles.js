import ColdPlunge from "../articles/cold-plunge";
import coldPlungeMeta from "../articles/cold-plunge/meta";

import TestArticleMeta from "../articles/test/meta";
import TestArticleMd from "../articles/test/article.md?raw";

import Week1 from "../articles/week-1";
import week1Meta from "../articles/week-1/meta";

import Tickets from "../articles/ticketbay";
import ticketsMeta from "../articles/ticketbay/meta";
import { Component } from "react";
export const articles = [
  {
    ...coldPlungeMeta,
    Component: ColdPlunge,
  },
  {
    ...week1Meta,
    Component: Week1
  },
  {
    ...TestArticleMeta,
    markdown: TestArticleMd,
  },
  {
    ...ticketsMeta,
    Component: Tickets
  }
];



/*import ColdPlunge from "../articles/cold-plunge";
import Week1 from "../articles/week-1";

export const articles = [
    {
        slug: "week-1",
        title: "1주차: d3를 사용한 시각화 + 스크롤리텔링 기사",
        author: "Writer 1",
        section: "science-research",
        date: Date("2025-12-05"),
        cover: "/week1/bigpicture.png",
        Component: Week1,
    },
    {
        id: 1,
        slug: "cold-plunge",
        title: "Cold Plunges for Him",
        author: "Writer 1",
        section: "reflections",
        date: Date("2025-12-05"),
        cover: "/coldplunge/img/title.jpg",
        Component: ColdPlunge,
    }
];*/