export class Menu {
  public static menu(user) {
    const Home = {
      text: "Home",
      link: "/home",
      icon: "icon-home"
    };
    const headingMain = {
      text: "Menú",
      heading: true
    };
    const AdminAgricola = {
      text: "Administradores",
      icon: "fas fa-users",
      submenu: [
        {
          text: "Agricolas",
          link: "/Admin-Agricola",
          icon: "icon-user",
        },
        {
          text: "Ingenieros",
          link: "/Admin-Ingeniero",
          icon: "fas fa-industry",
        },
      ],
    };

    const Ingenieros = {
      text: "Ingenieros",
      link: "/Ingeniero",
      icon: "fas fa-user-cog",
    };
    const lotes = {
      text: "Lotes",
      link: "/Lotes",
      icon: "fas fa-object-ungroup",
    };
       const Incidencias = {
         text: "Incidencias",
         link: "/Incidencias",
         icon: "fab fa-pagelines",
       };
  

    const UsuariosAgroindustriasAgronodo = {
      text: "Usuarios",
      icon: "icon-user",
      submenu: [
        {
          text: "Administradores",
          link: "/Admin-Agronodo",
          icon: "icon-user"
        },
        {
          text: "Agricola",
          link: "/Agricola",
          icon: "fas fa-industry"
        }
      ]
    };
    const Tareas = {
      text: "Tareas",
      icon: "fas fa-tasks",
      submenu: [
        {
          text: "Tareas",
          link: "/Tareas",
          icon: "icon-user",
        },
      ],
    };


    var role = [];

    var user = <any>JSON.parse(localStorage.getItem("USER"));
    if (!user) {
      role = [headingMain, Home, UsuariosAgroindustriasAgronodo];
    } else {      
      switch (user.user_type) {
        //Admin Agronodo
        case 2: {
          console.log("Eres administrador de agronodo");
          role = [headingMain, Home, UsuariosAgroindustriasAgronodo];
          break;
        }
        //Agricola
        case 3: {
 
          break;
        }
        // Agricola
        case 4: {
          role = [
            headingMain,
            Home,
            lotes,
            AdminAgricola,
            Ingenieros,
            Tareas,
            Incidencias,
          ];
          break;
        }
        //Admin Agricola
        case 5: {
       role = [
         headingMain,
         Home,
         lotes,
         Ingenieros,
         Tareas,
         Incidencias,
       ];
          break;
        }
        //Ingeniero
        case 6: {
          role = [headingMain, Home,Ingenieros,lotes];
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
