import ReactQueryProvider from "@/Providers/ReactQueryProvider";

const EcommerceLayout = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default EcommerceLayout;
