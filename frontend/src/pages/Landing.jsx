import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoMenuSharp, IoClose } from "react-icons/io5";

const Landing = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <script src="//unpkg.com/alpinejs" defer></script>

      <main>
        <section className="bg-white dark:bg-gray-900">
          <nav
            x-data={isOpen}
            className="container mx-auto p-6 lg:flex lg:items-center lg:justify-between"
          >
            <div className="flex items-center justify-between">
              <div>
                <a
                  className="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
                  href="#"
                >
                  Invoicify
                </a>
              </div>

              <div className="flex lg:hidden text-2xl font-bold">
                {isOpen && (
                  <button className="px-2" onClick={() => setOpen(false)}>
                    <IoClose />
                  </button>
                )}
                {!isOpen && (
                  <button onClick={() => setOpen(true)}>
                    <IoMenuSharp />
                  </button>
                )}
              </div>
            </div>

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div
              x-cloak:className={`${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
              className={`${
                !isOpen && "hidden"
              } absolute inset-x-0 z-20 w-full bg-white px-6 py-4 shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent`}
            >
              <div className="lg:-px-8 flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
                <a
                  className="my-2 border-2 border-orange-600 rounded-md px-5 py-2 hover:bg-orange-500 font-semibold"
                  href="/login"
                >
                  Login
                </a>
              </div>

              <a
                className="my-2 mx-2 border-2 border-orange-600 rounded-md px-5 py-2 hover:bg-orange-500 font-semibold"
                href="/register"
              >
                {" "}
                SignUp{" "}
              </a>
            </div>
          </nav>

          <div className="container mx-auto px-6 py-16 text-center">
            <div className="mx-auto max-w-lg">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white lg:text-4xl">
                Generate Invoices and Preview With Ease
              </h1>
              <p className="mt-6 text-gray-500 dark:text-gray-300">
                Generate Invoices for your business with ease and store them for
                future use. We allow to edit your Invoices and regenrate them.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <img
                className="h-96 w-full rounded-xl object-cover lg:w-4/5"
                src="https://plus.unsplash.com/premium_photo-1679923814036-8febf10a04c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW52b2ljZXxlbnwwfHwwfHx8MA%3D%3D"
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900">
          <div className="h-[32rem] bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-6 py-10">
              <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
                Made By
              </h1>

              <div className="mx-auto mt-6 flex justify-center">
                <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              </div>

              <p className="mx-auto mt-6 max-w-2xl text-center text-gray-500 dark:text-gray-300">
                We aim to provide efficient and easy user experience with this
                project of ours so that genrating Invoices is easy peasy for
                your business.
              </p>
            </div>
          </div>

          <div className="container mx-auto  -mt-72 px-6 py-10 sm:-mt-80 md:-mt-96">
            <div className="mt-8 grid grid-col  md:w-6/12 ls-1 mx-auto gap-8 md:grid-cols-2 xl:mt-16  content-center ">
              <div className="grid grid-col items-center rounded-xl border p-4 dark:border-gray-700 sm:p-6 place-items-center ">
                <img
                  className="aspect-square w-full rounded-xl object-cover"
                  src="https://media.licdn.com/dms/image/D4D35AQFlywR2WFF0Cg/profile-framedphoto-shrink_800_800/0/1702801435358?e=1706212800&v=beta&t=7oRf92mDeXEUHzRBszm_7yRdKFQwqwQlTzDrCWjYjok"
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">
                  Darish Khan
                </h1>

                <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">
                  Student
                </p>

                <div className="-mx-2 mt-3 flex">
                  <a
                    href="https://www.linkedin.com/in/darish-khan-7113b2170/"
                    target="_blank"
                    className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/darishkhan"
                    target="_blank"
                    className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>

              <div className="grid grid-col items-center rounded-xl border p-4 dark:border-gray-700 sm:p-6 place-items-center">
                <img
                  className="aspect-square w-full rounded-xl object-cover"
                  src="https://media.licdn.com/dms/image/C5603AQGiZM0Dv_bpFA/profile-displayphoto-shrink_800_800/0/1641494527469?e=1710979200&v=beta&t=ToDv6HSCtQ6XhcSTCAAoHkBdqV71SW0ylyi2WuB-108"
                />

                <h1 className="mt-4 text-2xl font-semibold capitalize text-gray-700 dark:text-white">
                  Aditya Kumar
                </h1>

                <p className="mt-2 capitalize text-gray-500 dark:text-gray-300">
                  Student
                </p>

                <div className="-mx-2 mt-3 flex">
                  <a
                    href="https://www.linkedin.com/in/aditya-singh-229756229/"
                    target="_blank"
                    className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/Aditya10T"
                    target="_blank"
                    className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Landing;
