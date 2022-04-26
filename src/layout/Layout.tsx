import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = (): JSX.Element => {

  //definimos el uso de useLocation y desestructuramos el pathname de location, el cual es usado para destacar el apartado en que te encuentras en ese momento (es decir, si haces click en cliente se resaltará cliente)
  const location = useLocation();
  const {pathname} = location;


  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          {/* utilizamos Link para que no haga la navegación como tal, si no entre las pages de react router */}
          <Link
            to="/"
            className={`${pathname === "/" ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 transition-colors hover:text-blue-300`}
          >
            Clientes
          </Link>
          <Link
            to="/nuevo"
            className={`${pathname === "/nuevo" ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 transition-colors hover:text-blue-300`}
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        {/* en el outlet se mostrará la página adecuada dependiendo de lo estipulado en el app.tsx */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
