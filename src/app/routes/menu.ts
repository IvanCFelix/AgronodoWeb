export class Menu {
  public static menu(user) {
    const Home = {
      text: "Home",
      link: "/home",
    };
    // const headingAdmin = {
    //   text: "Administradores",
    //   heading: true,
    // };
    const Adminagricola = {
      text: "Administradores agricolas",
      link: "/Admin-Agricola",
    };
    const AdminIngeniero = {
      text: "Administradores ingenieros",
      link: "/Admin-Ingeniero",
    };
    const Ingenieros = {
      text: "Ingenieros",
      link: "/Ingeniero",
    };
    const lotes = {
      text: "Lotes",
      link: "/Lotes",
    };
    const Incidencias = {
      text: "Incidencias",
      link: "/Incidencias",
    };

    const Admingronodo = {
      text: "Administradores",
      link: "/Admin-Agronodo",
    };
    const Agricola = {
      text: "Agricola",
      link: "/Agricola",
    };
    const Tareas = {
      text: "Tareas",
      link: "/Tareas",
    };

    var role = [];

    var user = <any>JSON.parse(localStorage.getItem("USER"));
    if (!user) {
      role = [Home, Admingronodo, Agricola];
    } else {
      switch (user.user_type) {
        //Admin Agronodo
        case 2: {
          console.log("Eres administrador de agronodo");
          role = [Home, Admingronodo, Agricola];
          break;
        }
        //Agricola
        case 3: {
          break;
        }
        // Agricola
        case 4: {
          role = [
            Home,
            lotes,
            Adminagricola,
            AdminIngeniero,
            Tareas,
            Ingenieros,
            Incidencias,
          ];
          break;
        }
        //Admin Agricola
        case 5: {
          role = [Home, lotes, AdminIngeniero, Ingenieros, Tareas, Incidencias];
          break;
        }
        //Ingeniero
        case 6: {
          role = [Home, Ingenieros, lotes, Tareas];
          break;
        }
        default: {
          break;
        }
      }
      return role;
    }
  }
}
