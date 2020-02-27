export class Menu {
  public static menu(user) {
    const HomeAgronodo = {
      text: "Home",
      link: "/home",
      icon: "icon-home"
    };
    const headingMain = {
      text: "Menú",
      heading: true
    };
    const HomeAgricola = {
      text: "Home",
      link: "/Home-agricola",
      icon: "icon-home"
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
      role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
    } else {
      switch (user.user_type) {
        //Admin Agronodo
        case 2: {
          console.log("Eres administrador de agronodo");
          role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
          break;
        }
        //Agricola
        case 3: {
          role = [headingMain, HomeAgronodo, AdminAgricola];
          break;
        }
        //Admin Agricola
        case 4: {
          role = [headingMain, HomeAgricola, AdminAgricola];
          break;
        }
        //Admin Ingeniero
        case 5: {
          role = [headingMain, HomeAgronodo, AdminAgricola];
          break;
        }
        //Ingeniero
        case 6: {
          role = [headingMain, HomeAgronodo, AdminAgricola];
          break;
        }
        default: {
          role = [headingMain, HomeAgronodo, AdminAgricola];
          break;
        }
      }
      return role;
    }
  }
}
