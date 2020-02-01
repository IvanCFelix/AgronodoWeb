const HomeAgronodo = {
  text: "Home",
  link: "/home",
  icon: "icon-home"
};
const Text = {
  text: "Text",
  link: "/home",
  icon: "icon-home"
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


let user = <any>JSON.parse(localStorage.getItem("USER"));
if (!user) {
  var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
} else {
  switch (user.user_type) {
    //Admin DIOSITO
    case 1: {
      var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    //Admin Agronodo
    case 2: {
      var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo,Text];
      break;
    }
    //Agricola
    case 3: {
      var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    //Admin Agricola
    case 4: {
      var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    //Admin Ingeniero
    case 5: {
      var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    //Ingeniero
    case 6: {
      var role = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo];
      break;
    }
    default: {
      break;
    }
  }
}

export const menu = role;
