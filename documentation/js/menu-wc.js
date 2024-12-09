'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nexo-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdminAvisosComponent.html" data-type="entity-link" >AdminAvisosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminPanelComponent.html" data-type="entity-link" >AdminPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminUsuariosComponent.html" data-type="entity-link" >AdminUsuariosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent-1.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AutoridadAvisosComponent.html" data-type="entity-link" >AutoridadAvisosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvisoPaginaComponent.html" data-type="entity-link" >AvisoPaginaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AvisoPrincipalComponent.html" data-type="entity-link" >AvisoPrincipalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComentarioDialogComponent.html" data-type="entity-link" >ComentarioDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComentariosComponent.html" data-type="entity-link" >ComentariosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CrearAutoridadComponent.html" data-type="entity-link" >CrearAutoridadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CrearAvisoComponent.html" data-type="entity-link" >CrearAvisoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DatosDesaparicionComponent.html" data-type="entity-link" >DatosDesaparicionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DesaparicionComponent.html" data-type="entity-link" >DesaparicionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DesaparicionFormComponent.html" data-type="entity-link" >DesaparicionFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DesaparicionPrincipalComponent.html" data-type="entity-link" >DesaparicionPrincipalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditaDesaparicionAutoridadComponent.html" data-type="entity-link" >EditaDesaparicionAutoridadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditaDialogComponent.html" data-type="entity-link" >EditaDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditaUsuarioComponent.html" data-type="entity-link" >EditaUsuarioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Error404Component.html" data-type="entity-link" >Error404Component</a>
                            </li>
                            <li class="link">
                                <a href="components/FiltroComponent.html" data-type="entity-link" >FiltroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GestionUsuarioComponent.html" data-type="entity-link" >GestionUsuarioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeadernewComponent.html" data-type="entity-link" >HeadernewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImageDialogComponent.html" data-type="entity-link" >ImageDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputFotosComponent.html" data-type="entity-link" >InputFotosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputShareComponent.html" data-type="entity-link" >InputShareComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListaDesaparicionesComponent.html" data-type="entity-link" >ListaDesaparicionesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListaDesaparicionesEliminadasComponent.html" data-type="entity-link" >ListaDesaparicionesEliminadasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListaNoAprobadasComponent.html" data-type="entity-link" >ListaNoAprobadasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListaSeguimientoComponent.html" data-type="entity-link" >ListaSeguimientoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocalizacionComponent.html" data-type="entity-link" >LocalizacionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapaComponent.html" data-type="entity-link" >MapaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapaPrincipalComponent.html" data-type="entity-link" >MapaPrincipalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuPerfilAutoridadComponent.html" data-type="entity-link" >MenuPerfilAutoridadComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MostrarmasComponent.html" data-type="entity-link" >MostrarmasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ParteIzquierdaCivilComponent.html" data-type="entity-link" >ParteIzquierdaCivilComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PerfilCivilComponent.html" data-type="entity-link" >PerfilCivilComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PerfilUsuarioComponent.html" data-type="entity-link" >PerfilUsuarioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegistraUsuarioComponent.html" data-type="entity-link" >RegistraUsuarioComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SobreNosotrosComponent.html" data-type="entity-link" >SobreNosotrosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VistaAdminComponent.html" data-type="entity-link" >VistaAdminComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VistaAutoridadComponent.html" data-type="entity-link" >VistaAutoridadComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/Civil.html" data-type="entity-link" >Civil</a>
                            </li>
                            <li class="link">
                                <a href="classes/CivilConfirmar.html" data-type="entity-link" >CivilConfirmar</a>
                            </li>
                            <li class="link">
                                <a href="classes/CivilCrearDTO.html" data-type="entity-link" >CivilCrearDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comentario.html" data-type="entity-link" >Comentario</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComentarioListar.html" data-type="entity-link" >ComentarioListar</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrearUsuario.html" data-type="entity-link" >CrearUsuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesaparicionEditaAutoridad.html" data-type="entity-link" >DesaparicionEditaAutoridad</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesaparicionGestionDTO.html" data-type="entity-link" >DesaparicionGestionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesaparicionIndividual.html" data-type="entity-link" >DesaparicionIndividual</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesaparicionLista.html" data-type="entity-link" >DesaparicionLista</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesaparicionPrincipal.html" data-type="entity-link" >DesaparicionPrincipal</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesaparicionSinVerificar.html" data-type="entity-link" >DesaparicionSinVerificar</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditaDesaparicion.html" data-type="entity-link" >EditaDesaparicion</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileData.html" data-type="entity-link" >FileData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Foto.html" data-type="entity-link" >Foto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FotoUrlDTO.html" data-type="entity-link" >FotoUrlDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/LugarDTO.html" data-type="entity-link" >LugarDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LugarLatLon.html" data-type="entity-link" >LugarLatLon</a>
                            </li>
                            <li class="link">
                                <a href="classes/MapaDesaparicion.html" data-type="entity-link" >MapaDesaparicion</a>
                            </li>
                            <li class="link">
                                <a href="classes/MapaPrincipal.html" data-type="entity-link" >MapaPrincipal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Persona.html" data-type="entity-link" >Persona</a>
                            </li>
                            <li class="link">
                                <a href="classes/PersonaIndividual.html" data-type="entity-link" >PersonaIndividual</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenData.html" data-type="entity-link" >TokenData</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsuarioMenu.html" data-type="entity-link" >UsuarioMenu</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthServiceService.html" data-type="entity-link" >AuthServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AutoridadService.html" data-type="entity-link" >AutoridadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AvisoService.html" data-type="entity-link" >AvisoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CivilService.html" data-type="entity-link" >CivilService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComentarioService.html" data-type="entity-link" >ComentarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DesaparicionService.html" data-type="entity-link" >DesaparicionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FiltroService.html" data-type="entity-link" >FiltroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeaderService.html" data-type="entity-link" >HeaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalizacionService.html" data-type="entity-link" >LocalizacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LugarService.html" data-type="entity-link" >LugarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificacionService.html" data-type="entity-link" >NotificacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link" >UsuarioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Autoridad.html" data-type="entity-link" >Autoridad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Aviso.html" data-type="entity-link" >Aviso</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notificacion.html" data-type="entity-link" >Notificacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioListaAdmin.html" data-type="entity-link" >UsuarioListaAdmin</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});