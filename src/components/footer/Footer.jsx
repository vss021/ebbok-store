import React from "react";

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex flex-col items-center gap-4 text-center sm:text-left sm:flex-row justify-between">
        {/* Footer Branding */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-xl font-bold">
            &copy; 2024 Vijay Singh. All rights reserved.
          </h1>
        </div>

        {/* Footer Description */}
        <div className="text-sm">
          <p>
            This project, including all source code, assets, and documentation,
            is the copyrighted property of Vijay Singh. Unauthorized copying,
            modification, distribution, or use of this project, in whole or in
            part, is strictly prohibited without prior written consent.
          </p>
          <p className="mt-2">
            For inquiries, please contact:
            <a
              href="mailto:vijay@gmail.com"
              className="text-red-600 hover:underline px-1"
            >
              vijay@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
