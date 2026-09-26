"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/logo.png";

import {
  getPlan,
  getSaved,
} from "@/lib/storage";

const Navber = () => {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCount = () => {
    setPlanCount(getPlan().length);
    setSavedCount(getSaved().length);
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("fitlog-update", updateCount);

    return () => {
      window.removeEventListener("fitlog-update", updateCount);
    };
  }, []);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm max-w-7xl mx-auto px-4 rounded-box mt-2">

        <div className="navbar-start">

          <Link
            href="/"
            className="flex gap-2 items-center"
          >
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
            />

            <span className="text-xl font-bold">
              FITLOG
            </span>
          </Link>

        </div>

        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal gap-2">

            <li>
              <Link
                href="/"
                className="rounded-full bg-lime-200 text-black font-semibold"
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/my-plan"
                className="rounded-full"
              >
                My Plan
              </Link>
            </li>

          </ul>

        </div>

        <div className="navbar-end flex gap-2">

          <Link
            href="/my-plan"
            className="btn"
          >
            Plan

            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="btn"
          >
            Saved

            <span className="border px-2 py-0.5 rounded-full text-xs">
              {savedCount}
            </span>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Navber;