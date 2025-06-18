import Sidebar from "@/component/shared/Sidebar"
import Session from "@/component/shared/Session";



const RootLayout = ({children}) => {
     return (
         <Session>
         <main className="flex min-h-screen w-full flex-col bg-[#060606] lg:flex-row">
              <Sidebar/>
             <div className="flex-1 overflow-auto lg:mt-0 lg:max-h-screen">
                 <div className="w-full max-w-6xl mx-auto">
                    <div className="max-w-7xl mx-auto px-10 md:px-10 w-full text-dark-400">
                    {children}
                    </div>
                 </div>
             </div>
         </main>
         </Session>
          
     )
}

export default RootLayout