import ReactQueryProvider from "@/Providers/ReactQueryProvider";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default UsersLayout;
