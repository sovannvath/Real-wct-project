
export const metadata = {
  title: "TogetherTech",
  description: "Join us with togethertech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      
      <section>
        
          {children}
       
      </section>
   
  );
}
