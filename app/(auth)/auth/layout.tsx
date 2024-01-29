import { FaHandshake } from "react-icons/fa";

export const metadata = {
  title: "FIM | Authentication",
  description: "Login to access your account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-center bg-cover min-h-screen w-full"
        style={{
          backgroundImage: `url("/assets/login_bg.jpg")`,
        }}
      >
        <div className="flex flex-col items-center h-screen w-screen md:flex-row bg-gray-900 bg-opacity-60 md:px-10 lg:px-20 gap-12">
          <div className="hidden md:flex flex-col lg:flex-row items-center md:w-[50%] lg:w-[60%] gap-12">
            <p className="text-4xl xl:text-5xl font-bold text-white ">
              Food 4 Education
            </p>
            <div className="flex items-center justify-center p-6 m-6 border-2 border-f4e-green rounded-full ">
              <FaHandshake className="text-3xl md:text-4xl lg:text-5xl text-f4e-orange" />
            </div>
            <p className="text-4xl xl:text-5xl font-bold text-white">
              FIM Dashboard
            </p>
          </div>
          <main
            className="flex items-center my-16  md:py-8 md:my-auto max-w-md p-6 mx-auto md:w-[40%] lg:w-[30%]
         bg-black border border-white rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg
            "
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
