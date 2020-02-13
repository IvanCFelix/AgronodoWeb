const HomeAgronodo = {
  text: "Home",
  link: "/home",
  icon: "icon-home"
};
const Profile = {
  text: "ejemplo",
  icon: "icon-user",
  submenu: [
    {
      text: "Agricolas",
      link: "/profile/ejemplo",
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

const headingMain = {
  text: "Menú",
  heading: true
};


var role = []


let user = <any>JSON.parse(localStorage.getItem("USER"));
if (!user) {
 role = [headingMain, HomeAgronodo,UsuariosAgroindustriasAgronodo];
} else {
  switch (user.user_type) {
    //Admin DIOSITO
    case 1: {
     role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    //Admin Agronodo
    case 2: {
      console.log("Eres administrador de agronodo")
      role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    //Agricola
    case 3: {
      role = [headingMain, HomeAgronodo, Profile];
      break;
    }
    //Admin Agricola
    case 4: {
      role = [headingMain, HomeAgronodo, Profile];
      break;
    }
    //Admin Ingeniero
    case 5: {
      role = [headingMain, HomeAgronodo, Profile];
      break;
    }
    //Ingeniero
    case 6: {
     role = [headingMain, HomeAgronodo, Profile];
      break;
    }
    default: {
      role = [headingMain, HomeAgronodo, Profile];
      break;
    }
  }
}

export const menu = role;
