const adminAgricola = {
  text: "Agricola",
  link: "/Admin-Agricola",
  icon: "icon-home"
};
const HomeAgronodo = {
    text: "Home",
    link: "/home",
    icon: "icon-home"
  };
const UsuariosAgroindustriasAgronodo = {
  text: "Usuarios",
  submenu: [
    {
      text: "Administrador-Agro",
      link: "/Admin-Agronodo",
      icon: "icon-user"
    },
    {
      text: "Agroindustrias-Agro",
      link: "/Agroindustrias-Agronodo",
      icon: "fas fa-industry"
    }
  ]
};

const headingMain = {
  text: "Main Navigation",
  heading: true
};


let user = (<any>JSON.parse(localStorage.getItem('USER')))

if(user.user_type == 4){
 var adminagronodo = [headingMain, HomeAgronodo, UsuariosAgroindustriasAgronodo, adminAgricola]
}
if(user.user_type == 0){
  this.adminagronodo = [HomeAgronodo]
}

export const menu = adminagronodo;


