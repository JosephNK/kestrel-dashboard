export default function Layout({ children }: React.PropsWithChildren) {
  console.log("Layout children", children);
  return <main>{children}</main>;
}
