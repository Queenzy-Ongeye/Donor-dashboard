import Link from "next/link";
import { IconType } from "react-icons";

interface ISummaryCards {
  title: string;
  route: string;
  total: any;
  icon: IconType;
  id?: any;
}

const Cards = ({ title, route, total, icon: Icon, id }: ISummaryCards) => {
  return (
    <div className="flex flex-col min-w-0 mb-3 border border-f4e-f4e-green break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-2">
        <div className="flex flex-wrap justify-between px-2">
          <div className="flex-none w-2/3 max-w-full px-2">
            <div>
              <Link href={route}>
                <p className="mb-0 font-sans font-semibold leading-normal text-xs">
                  {title}
                </p>
                <h5 className="mb-0 font-bold">{total}</h5>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-gradient-to-tl from-f4e-orange to-f4e-green shadow-soft-2xl">
            <Icon
              className="h-[60%] w-[60%] text-sm relative text-white"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
