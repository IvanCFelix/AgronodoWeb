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
      icon: "icon-user",
      submenu: [
        {
          text: "Agricolas",
          link: "/Ingeniero",
          icon: "icon-user"
        },
        {
          text: "Lotes",
          link: "/Lotes",
          icon: "icon-user"
        }
      ]
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
          role = [headingMain, Home, AdminAgricola];
          break;
        }
        //Admin Agricola
        case 4: {
          role = [headingMain, Home, AdminAgricola];
          break;
        }
        //Admin Ingeniero
        case 5: {
          role = [headingMain, Home, AdminAgricola];
          break;
        }
        //Ingeniero
        case 6: {
          role = [headingMain, Home, AdminAgricola];
          break;
        }
        default: {
          role = [headingMain, Home, AdminAgricola];
          break;
        }
      }
      return role;
    }
  
  }
}
