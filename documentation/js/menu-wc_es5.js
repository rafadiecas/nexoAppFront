'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">nexo-app documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links"' : 'data-bs-target="#xs-components-links"', ">\n                            <span class=\"icon ion-md-cog\"></span>\n                            <span>Components</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="components-links"' : 'id="xs-components-links"', ">\n                            <li class=\"link\">\n                                <a href=\"components/AdminAvisosComponent.html\" data-type=\"entity-link\" >AdminAvisosComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AdminPanelComponent.html\" data-type=\"entity-link\" >AdminPanelComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AdminUsuariosComponent.html\" data-type=\"entity-link\" >AdminUsuariosComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" >AppComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AppComponent-1.html\" data-type=\"entity-link\" >AppComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AutoridadAvisosComponent.html\" data-type=\"entity-link\" >AutoridadAvisosComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AvisoPaginaComponent.html\" data-type=\"entity-link\" >AvisoPaginaComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AvisoPrincipalComponent.html\" data-type=\"entity-link\" >AvisoPrincipalComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ComentarioDialogComponent.html\" data-type=\"entity-link\" >ComentarioDialogComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ComentariosComponent.html\" data-type=\"entity-link\" >ComentariosComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/CrearAutoridadComponent.html\" data-type=\"entity-link\" >CrearAutoridadComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/CrearAvisoComponent.html\" data-type=\"entity-link\" >CrearAvisoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DatosDesaparicionComponent.html\" data-type=\"entity-link\" >DatosDesaparicionComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DesaparicionComponent.html\" data-type=\"entity-link\" >DesaparicionComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DesaparicionFormComponent.html\" data-type=\"entity-link\" >DesaparicionFormComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DesaparicionPrincipalComponent.html\" data-type=\"entity-link\" >DesaparicionPrincipalComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/EditaDesaparicionAutoridadComponent.html\" data-type=\"entity-link\" >EditaDesaparicionAutoridadComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/EditaDialogComponent.html\" data-type=\"entity-link\" >EditaDialogComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/EditaUsuarioComponent.html\" data-type=\"entity-link\" >EditaUsuarioComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/Error404Component.html\" data-type=\"entity-link\" >Error404Component</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FiltroComponent.html\" data-type=\"entity-link\" >FiltroComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FooterComponent.html\" data-type=\"entity-link\" >FooterComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/GestionUsuarioComponent.html\" data-type=\"entity-link\" >GestionUsuarioComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/HeaderComponent.html\" data-type=\"entity-link\" >HeaderComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/HeadernewComponent.html\" data-type=\"entity-link\" >HeadernewComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/HomeComponent.html\" data-type=\"entity-link\" >HomeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ImageDialogComponent.html\" data-type=\"entity-link\" >ImageDialogComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/InputFotosComponent.html\" data-type=\"entity-link\" >InputFotosComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/InputShareComponent.html\" data-type=\"entity-link\" >InputShareComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ListaDesaparicionesComponent.html\" data-type=\"entity-link\" >ListaDesaparicionesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ListaDesaparicionesEliminadasComponent.html\" data-type=\"entity-link\" >ListaDesaparicionesEliminadasComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ListaNoAprobadasComponent.html\" data-type=\"entity-link\" >ListaNoAprobadasComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ListaSeguimientoComponent.html\" data-type=\"entity-link\" >ListaSeguimientoComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LocalizacionComponent.html\" data-type=\"entity-link\" >LocalizacionComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LoginComponent.html\" data-type=\"entity-link\" >LoginComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MapaComponent.html\" data-type=\"entity-link\" >MapaComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MapaPrincipalComponent.html\" data-type=\"entity-link\" >MapaPrincipalComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MenuPerfilAutoridadComponent.html\" data-type=\"entity-link\" >MenuPerfilAutoridadComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MostrarmasComponent.html\" data-type=\"entity-link\" >MostrarmasComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ParteIzquierdaCivilComponent.html\" data-type=\"entity-link\" >ParteIzquierdaCivilComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/PerfilCivilComponent.html\" data-type=\"entity-link\" >PerfilCivilComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/PerfilUsuarioComponent.html\" data-type=\"entity-link\" >PerfilUsuarioComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/RegistraUsuarioComponent.html\" data-type=\"entity-link\" >RegistraUsuarioComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SobreNosotrosComponent.html\" data-type=\"entity-link\" >SobreNosotrosComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/VistaAdminComponent.html\" data-type=\"entity-link\" >VistaAdminComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/VistaAutoridadComponent.html\" data-type=\"entity-link\" >VistaAutoridadComponent</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/Auth.html\" data-type=\"entity-link\" >Auth</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Civil.html\" data-type=\"entity-link\" >Civil</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CivilConfirmar.html\" data-type=\"entity-link\" >CivilConfirmar</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CivilCrearDTO.html\" data-type=\"entity-link\" >CivilCrearDTO</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Comentario.html\" data-type=\"entity-link\" >Comentario</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ComentarioListar.html\" data-type=\"entity-link\" >ComentarioListar</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CrearUsuario.html\" data-type=\"entity-link\" >CrearUsuario</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DenunciaComentario.html\" data-type=\"entity-link\" >DenunciaComentario</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DesaparicionEditaAutoridad.html\" data-type=\"entity-link\" >DesaparicionEditaAutoridad</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DesaparicionGestionDTO.html\" data-type=\"entity-link\" >DesaparicionGestionDTO</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DesaparicionIndividual.html\" data-type=\"entity-link\" >DesaparicionIndividual</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DesaparicionLista.html\" data-type=\"entity-link\" >DesaparicionLista</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DesaparicionPrincipal.html\" data-type=\"entity-link\" >DesaparicionPrincipal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DesaparicionSinVerificar.html\" data-type=\"entity-link\" >DesaparicionSinVerificar</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/EditaDesaparicion.html\" data-type=\"entity-link\" >EditaDesaparicion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FileData.html\" data-type=\"entity-link\" >FileData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Foto.html\" data-type=\"entity-link\" >Foto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FotoUrlDTO.html\" data-type=\"entity-link\" >FotoUrlDTO</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Login.html\" data-type=\"entity-link\" >Login</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LugarDTO.html\" data-type=\"entity-link\" >LugarDTO</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LugarLatLon.html\" data-type=\"entity-link\" >LugarLatLon</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/MapaDesaparicion.html\" data-type=\"entity-link\" >MapaDesaparicion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/MapaPrincipal.html\" data-type=\"entity-link\" >MapaPrincipal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Persona.html\" data-type=\"entity-link\" >Persona</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/PersonaIndividual.html\" data-type=\"entity-link\" >PersonaIndividual</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/TokenData.html\" data-type=\"entity-link\" >TokenData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UsuarioMenu.html\" data-type=\"entity-link\" >UsuarioMenu</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthServiceService.html\" data-type=\"entity-link\" >AuthServiceService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AutoridadService.html\" data-type=\"entity-link\" >AutoridadService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AvisoService.html\" data-type=\"entity-link\" >AvisoService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CivilService.html\" data-type=\"entity-link\" >CivilService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ComentarioService.html\" data-type=\"entity-link\" >ComentarioService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/DesaparicionService.html\" data-type=\"entity-link\" >DesaparicionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/FiltroService.html\" data-type=\"entity-link\" >FiltroService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/HeaderService.html\" data-type=\"entity-link\" >HeaderService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LocalizacionService.html\" data-type=\"entity-link\" >LocalizacionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LoginService.html\" data-type=\"entity-link\" >LoginService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LugarService.html\" data-type=\"entity-link\" >LugarService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/NotificacionService.html\" data-type=\"entity-link\" >NotificacionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UsuarioService.html\" data-type=\"entity-link\" >UsuarioService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interceptors-links"' : 'data-bs-target="#xs-interceptors-links"', ">\n                            <span class=\"icon ion-ios-swap\"></span>\n                            <span>Interceptors</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interceptors/AuthInterceptor.html\" data-type=\"entity-link\" >AuthInterceptor</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Autoridad.html\" data-type=\"entity-link\" >Autoridad</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Aviso.html\" data-type=\"entity-link\" >Aviso</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Notificacion.html\" data-type=\"entity-link\" >Notificacion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/UsuarioListaAdmin.html\" data-type=\"entity-link\" >UsuarioListaAdmin</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement)));