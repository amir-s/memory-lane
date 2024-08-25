import { CubeIcon } from "@heroicons/react/20/solid";

export default function MainWithHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center py-2 pl-2 space-x-2 border-b-[1px] border-b-base-content border-opacity-50 justify-between">
        <div className="flex-grow flex items-center gap-2">
          <CubeIcon className="h-8 w-8" />
          <h1 className="text-2xl font-semibold inline">
            <a href="/">Memory Lane</a>
          </h1>
        </div>
        <div>
          <ul className="menu menu-horizontal">
            <li>
              <a href="/">+ New Memory</a>
            </li>
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
