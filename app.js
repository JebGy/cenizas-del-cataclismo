/**
 * CENIZAS DEL CATACLISMO — WIKI & CRÓNICAS DE RAYCRESARK
 * Protocol: Premium Utilitarian Minimalism & Editorial UI (Sidebar + Single Page Engine)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderJugadores();
  renderClases();
  renderJefes('all');
  renderMods('all', '');
  initNavigation();
  initMobileDrawer();
  initSearchAndFilters();
  initActiveSectionObserver();
});

/* ==========================================================================
   NAVEGACIÓN SINGLE PAGE CON SCROLL SUAVE
   ========================================================================== */

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${targetId}`);

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile drawer if open
        if (sidebar && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          if (backdrop) backdrop.classList.remove('active');
        }
      }
    });
  });

  // Handle direct hash on page load
  if (window.location.hash) {
    const initialTarget = document.getElementById(window.location.hash.replace('#', ''));
    if (initialTarget) {
      setTimeout(() => {
        initialTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

/* ==========================================================================
   MENU HAMBURGUESA Y DRAWER MÓVIL
   ========================================================================== */

function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });
  }
}

/* ==========================================================================
   OBSERVADOR DE SECCIÓN ACTIVA EN SCROLL
   ========================================================================== */

function initActiveSectionObserver() {
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-15% 0px -75% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   DATOS: JUGADORES DE LA MESA REDONDA
   ========================================================================== */

const JUGADORES_DATA = [
  {
    nombre: "Tú (El Conquistador)",
    titulo: "Rey de Raycresark & Campeón del Trono",
    arquetipo: "Mando Supremo & Estratega",
    tagColor: "yellow",
    isKing: true,
    estado: "En el Trono",
    arma: "Espada Larga Real & Escudo Blasón",
    armadura: "Set Completo de Caballero de Raycresark",
    deber: "Gobernanza central, asignación de misiones y mando supremo en asedios mayores.",
    habilidad: "Decreto Real (Coordinación táctica de grupo)",
    bio: "Combatiente que derrotó al viejo regente en combate singular y asumió la corona por derecho directo de conquista.",
    colSpan: "bento-col-12"
  },
  {
    nombre: "Pedro",
    titulo: "Gran Mariscal de la Guardia Real",
    arquetipo: "Vanguardia Pesada / Tanque",
    tagColor: "red",
    isKing: false,
    estado: "Convocado",
    arma: "Hacha de Guerra & Escudo de Torre",
    armadura: "Placas Reforzadas (Armor of the Ages)",
    deber: "Custodia de los accesos principales y fijación del agro de jefes.",
    habilidad: "Muralla Inquebrantable (Bloqueo frontal pesado)",
    bio: "Especialista en absorción de daño y ruptura de formaciones enemigas.",
    colSpan: "bento-col-6"
  },
  {
    nombre: "Cristhian",
    titulo: "Maestro de Bestias y Explorador",
    arquetipo: "Ranger / Cartógrafo",
    tagColor: "green",
    isKing: false,
    estado: "Convocado",
    arma: "Arco Largo Recurvo & Daga Táctica",
    armadura: "Cuero Reforzado & Paraglider",
    deber: "Mapeo territorial (Xaero's Map) y doma de monturas (Alex's Mobs).",
    habilidad: "Ojo de Halcón (Reconocimiento aéreo y daño a distancia)",
    bio: "Rastreador de terreno agreste encargado de proveer monturas a la corte.",
    colSpan: "bento-col-6"
  },
  {
    nombre: "Marcos",
    titulo: "Gran Maestre Alquimista y Médico",
    arquetipo: "Soporte Vital / Alquimia",
    tagColor: "blue",
    isKing: false,
    estado: "Convocado",
    arma: "Vara de Concentración & Daga Alquímica",
    armadura: "Túnica de Protección & Mochila con Inyector",
    deber: "Formulación de pociones de salpicadura y rescate médico (PlayerRevive).",
    habilidad: "Reanimación Rápida (Recuperación de aliados en 3s)",
    bio: "Responsable de los huertos medicinales y la preservación de vidas en expedición.",
    colSpan: "bento-col-4"
  },
  {
    nombre: "Alexandre",
    titulo: "Alto Forjador e Ingeniero",
    arquetipo: "Coloso de Acero / Minería Profunda",
    tagColor: "purple",
    isKing: false,
    estado: "Convocado",
    arma: "Gran Maza de Dos Manos & Picos de Diamante",
    armadura: "Armadura de Herrería Reforzada",
    deber: "Extracción en cotas profundas (Y = -58) y forja de armamento modular.",
    habilidad: "Golpe Sísmico (Demolición de blindajes pesados)",
    bio: "Maestro del yunque encargado de equipar a la totalidad de la orden.",
    colSpan: "bento-col-4"
  },
  {
    nombre: "César",
    titulo: "Gran Cazador de Sombras",
    arquetipo: "DPS Crítico / Flanqueador",
    tagColor: "gray",
    isKing: false,
    estado: "Convocado",
    arma: "Dagas Duales & Katanas Rápidas",
    armadura: "Set Liviano de Sigilo",
    deber: "Incursión en criptas de The Graveyard y eliminación de objetivos clave.",
    habilidad: "Danza Evasiva (I-frames extendidos y golpes a la espalda)",
    bio: "Combatiente ágil que explota las ventanas de aturdimiento de los jefes.",
    colSpan: "bento-col-4"
  }
];

function renderJugadores() {
  const container = document.getElementById('jugadores-grid');
  if (!container) return;

  container.innerHTML = JUGADORES_DATA.map(j => `
    <div class="bento-card ${j.colSpan} ${j.isKing ? 'highlight' : ''}">
      <div class="bento-header">
        <div class="bento-title-group">
          <h3>${j.nombre}</h3>
          <div class="bento-meta">${j.titulo}</div>
        </div>
        <span class="tag-pastel ${j.tagColor}">${j.estado}</span>
      </div>
      <div class="bento-body">
        <div class="metrics-row" style="margin-top: 0; padding-top: 0; border-top: none; margin-bottom: 1rem;">
          <div class="metric-item">
            <span class="metric-label">Arquetipo</span>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">${j.arquetipo}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Armamento</span>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">${j.arma}</span>
          </div>
        </div>
        <p><strong>Responsabilidad:</strong> ${j.deber}</p>
        <p><strong>Especialidad:</strong> ${j.habilidad}</p>
        <p style="font-size: 0.84rem; color: var(--text-secondary); font-style: italic;">"${j.bio}"</p>
      </div>
      <div class="bento-footer">
        <span>Asiento Oficial</span>
        <span>Mesa Redonda</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   DATOS: MANUAL DE CLASES INICIALES
   ========================================================================== */

const CLASES_DATA = [
  {
    nombre: "Paladín de la Guardia",
    rol: "Tanque / Defensor Frontal",
    vida: 95,
    danio: 65,
    movilidad: 45,
    soporte: 70,
    armas: "Espada & Escudo de Torre, Maza de Placas",
    ventajas: ["30% de mitigación al daño frontal con escudo", "Generación natural de agro enemigo", "Resistencia al retroceso de colosos"]
  },
  {
    nombre: "Cazador de Sombras",
    rol: "DPS Ágil / Asesino",
    vida: 60,
    danio: 95,
    movilidad: 90,
    soporte: 30,
    armas: "Dagas Duales, Katanas, Espadas Rápidas",
    ventajas: ["Cuadros de invulnerabilidad aumentados en rodada (R)", "+40% de daño en impactos a la espalda", "Velocidad de ataque incrementada"]
  },
  {
    nombre: "Maestro de Bestias",
    rol: "Ranger / Reconocimiento",
    vida: 70,
    danio: 80,
    movilidad: 85,
    soporte: 65,
    armas: "Arcos Largos, Ballestas, Lanzas de Caza",
    ventajas: ["Consumo reducido de estamina en Paraglider", "Eficacia al domesticar criaturas de Alex's Mobs", "Visión táctica de objetivos a larga distancia"]
  },
  {
    nombre: "Médico de Batalla",
    rol: "Sanador / Alquimista",
    vida: 65,
    danio: 50,
    movilidad: 60,
    soporte: 100,
    armas: "Varas de Alma, Pociones de Salpicadura",
    ventajas: ["Tiempo de reanimación reducido a 3s en PlayerRevive", "Alcance aumentado en pociones arrojadizas", "Regeneración pasiva de estamina para aliados cercanos"]
  },
  {
    nombre: "Berserker Forjador",
    rol: "Coloso / Demoledor",
    vida: 90,
    danio: 90,
    movilidad: 40,
    soporte: 50,
    armas: "Grandes Espadas a Dos Manos, Mazas Pesadas",
    ventajas: ["Amplio arco de daño de área en Better Combat", "Ruptura de posturas en enemigos blindados", "+50% de rendimiento al minar en cotas profundas"]
  },
  {
    nombre: "Caballero Comandante",
    rol: "Líder Híbrido / Táctico",
    vida: 80,
    danio: 75,
    movilidad: 70,
    soporte: 80,
    armas: "Lanza de Caballería, Espada Larga y Estandarte",
    ventajas: ["Bonificación pasiva de daño a aliados cercanos", "Aumento de vitalidad en soldados reclutados (Human Companions)", "Coordinación en asedios y defensas de fortalezas"]
  }
];

function renderClases() {
  const container = document.getElementById('clases-grid');
  if (!container) return;

  container.innerHTML = CLASES_DATA.map(c => `
    <div class="bento-card bento-col-4">
      <div class="bento-header">
        <div class="bento-title-group">
          <h3>${c.nombre}</h3>
          <div class="bento-meta">${c.rol}</div>
        </div>
        <span class="tag-pastel gray">Arquetipo</span>
      </div>
      <div class="bento-body">
        <div class="stat-metric-list">
          <div class="stat-metric-row">
            <span class="stat-metric-name">Vitalidad</span>
            <div class="stat-metric-bar"><div class="stat-metric-progress" style="width: ${c.vida}%"></div></div>
            <span class="stat-metric-number">${c.vida}</span>
          </div>
          <div class="stat-metric-row">
            <span class="stat-metric-name">Ofensiva</span>
            <div class="stat-metric-bar"><div class="stat-metric-progress" style="width: ${c.danio}%"></div></div>
            <span class="stat-metric-number">${c.danio}</span>
          </div>
          <div class="stat-metric-row">
            <span class="stat-metric-name">Movilidad</span>
            <div class="stat-metric-bar"><div class="stat-metric-progress" style="width: ${c.movilidad}%"></div></div>
            <span class="stat-metric-number">${c.movilidad}</span>
          </div>
          <div class="stat-metric-row">
            <span class="stat-metric-name">Soporte</span>
            <div class="stat-metric-bar"><div class="stat-metric-progress" style="width: ${c.soporte}%"></div></div>
            <span class="stat-metric-number">${c.soporte}</span>
          </div>
        </div>
        <p style="margin-top: 0.85rem;"><strong>Equipo:</strong> ${c.armas}</p>
        <p><strong>Rasgos Pasivos:</strong></p>
        <ul style="list-style: square; padding-left: 1.15rem; font-size: 0.85rem; color: var(--text-secondary);">
          ${c.ventajas.map(v => `<li style="margin-bottom: 0.3rem;">${v}</li>`).join('')}
        </ul>
      </div>
      <div class="bento-footer">
        <span>Manual de Inicio</span>
        <span>Forge 1.20.1</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   DATOS: BESTIARIO DE JEFES POR TIERS
   ========================================================================== */

const JEFES_DATA = [
  {
    tier: 0,
    nombre: "Mutant Zombie & Skeleton",
    mod: "Mutant Monsters",
    ubicacion: "Superficie nocturna / Bosques",
    dificultad: "Básica",
    mecanica: "El zombi resucita hasta 3 veces si no es incinerado al caer noqueado. El esqueleto ejecuta ráfagas múltiples y saltos con impacto sísmico.",
    debilidad: "Fuego continuo para anular la resurrección; esquivar el impacto con rodada (R).",
    drops: "Hulk Hammer, restos mutantes, XP acelerada.",
    estrategia: "Pedro bloquea frontalmente; Alexandre y César rematan en el suelo y aplican fuego."
  },
  {
    tier: 1,
    nombre: "Ferrous Wroughtnaut",
    mod: "Mowzie's Mobs",
    ubicacion: "Cámaras acorazadas subterráneas (Y: -20 a 20)",
    dificultad: "Media",
    mecanica: "Blindaje frontal 100% impenetrable. Clava el hacha en el terreno durante 3 segundos tras un ataque vertical.",
    debilidad: "Punto débil expuesto en la espalda durante el atasque del hacha.",
    drops: "Wrought Helm (Casco indestructible), Axe of the Thousand Metal.",
    estrategia: "El tanque absorbe el golpe; los atacantes ruedan hacia la espalda para encajar golpes críticos."
  },
  {
    tier: 1,
    nombre: "Frostmaw",
    mod: "Mowzie's Mobs",
    ubicacion: "Cumbres y montañas glaciares",
    dificultad: "Media",
    mecanica: "Aliento de escarcha continuo que congela y ralentiza. Impacto en salto con demolición de área.",
    debilidad: "Daño ígneo y desplazamiento continuo en círculos.",
    drops: "Ice Crystal (Proyector continuo de escarcha).",
    estrategia: "Cristhian aplica daño a distancia con proyectiles mientras el grupo evade el cono de frío."
  },
  {
    tier: 1,
    nombre: "The Corrupted Champion / Lich",
    mod: "The Graveyard",
    ubicacion: "Criptas y cementerios de gran escala",
    dificultad: "Media-Alta",
    mecanica: "Invocación de no-muertos y generación de charcos de corrupción que aplican efecto Decay/Wither.",
    debilidad: "Insumos curativos, cubos de leche y daño radiante/fuego.",
    drops: "Reliquias oscuras, Fragmentos de Alma, gemas de estamina.",
    estrategia: "Marcos sostiene al grupo con salpicaduras curativas mientras César ataca los flancos del Lich."
  },
  {
    tier: 2,
    nombre: "Ghost of Captain Cornelia",
    mod: "Aquamirae",
    ubicacion: "Buque sumergido en el Océano Glacial",
    dificultad: "Alta",
    mecanica: "Embestidas de alta velocidad, invocación de clones de hielo y vórtice de frío abisal.",
    debilidad: "Daño de fuego sostenido para mitigar la regeneración de vida.",
    drops: "Terrible Sword, Divider, Golden Feather, escamas abisales.",
    estrategia: "Requeridas pociones de respiración acuática. Destruir clones rápidamente."
  },
  {
    tier: 3,
    nombre: "Netherite Monstrosity",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Monstrous Forge (Nether)",
    dificultad: "Muy Alta",
    mecanica: "Terremotos con martillos colosales y expulsión de lava fundida.",
    debilidad: "Desplazamiento aéreo continuo con Paraglider; castigo a las extremidades inferiores.",
    drops: "Monstrous Horn, Lingotes de Netherite Puro, The Incinerator.",
    estrategia: "Tomar posición en las plataformas superiores para evitar el impacto de área en suelo."
  },
  {
    tier: 3,
    nombre: "Ignis",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Burning Arena (Nether)",
    dificultad: "Muy Alta",
    mecanica: "Fase 1 con escudo y espada pesada; Fase 2 con doble espada ígnea, levitación y columnas de fuego.",
    debilidad: "Pociones de Resistencia al Fuego obligatorias; doble rodada para esquivar la caída en picada.",
    drops: "Ignitium Ingot (Armadura inmune a fuego), The Incinerator.",
    estrategia: "Evitar golpear el escudo frontal para no sufrir aturdimiento. Despliegue en abanico."
  },
  {
    tier: 4,
    nombre: "The Harbinger",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Ancient Factory (Cotas profundas del Overworld)",
    dificultad: "Épica",
    mecanica: "Haz láser continuo de carga, proyectiles teledirigidos de Wither y escudo eléctrico deflector.",
    debilidad: "Cobertura tras columnas sólidas; combate cuerpo a cuerpo durante el escudo reflector.",
    drops: "Witherite Ingot, Laser Gatling, Netherite Mechanical Arm.",
    estrategia: "Control estricto de coberturas. El tanque intercepta proyectiles con escudo de torre."
  },
  {
    tier: 4,
    nombre: "Void Worm",
    mod: "Alex's Mobs",
    ubicacion: "El Vacío del End (Invocación con Mysterious Worm)",
    dificultad: "Épica",
    mecanica: "Coloso volador de múltiples segmentos con apertura de portales dimensionales.",
    debilidad: "Impactos directos en los segmentos corporales luminosos (la cabeza presenta alta resistencia).",
    drops: "Void Worm Eye, Void Worm Mandible (para fabricar el Dimensional Carver).",
    estrategia: "Uso obligatorio de Paraglider o Elytra para prevenir caídas al vacío."
  },
  {
    tier: 5,
    nombre: "The Leviathan",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Sunken City (Fosa Abisal del End)",
    dificultad: "Legendaria / Objetivo Final",
    mecanica: "Tres fases subacuáticas, cuatro orbes protectores y vórtice gravitacional de agujero negro.",
    debilidad: "Destrucción secuencial de los orbes antes de dañar el cuerpo principal; nado en oposición al vórtice.",
    drops: "Abyssal Sacrifice, Tidal Claws, Título de Campeón de las Cenizas.",
    estrategia: "Despliegue de los 6 miembros al máximo nivel de equipamiento, tótems y pociones de fuerza II."
  }
];

function renderJefes(filterTier = 'all') {
  const container = document.getElementById('jefes-grid');
  if (!container) return;

  const filtered = filterTier === 'all' 
    ? JEFES_DATA 
    : JEFES_DATA.filter(j => j.tier.toString() === filterTier);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="bento-card bento-col-12" style="text-align: center; color: var(--text-muted); padding: 2rem;">No hay jefes registrados para este Tier.</div>`;
    return;
  }

  container.innerHTML = filtered.map(j => `
    <div class="bento-card bento-col-6">
      <div class="bento-header">
        <div class="bento-title-group">
          <h3>${j.nombre}</h3>
          <div class="bento-meta">${j.mod} &bull; Tier ${j.tier}</div>
        </div>
        <span class="tag-pastel ${j.tier >= 4 ? 'purple' : j.tier >= 3 ? 'red' : 'yellow'}">${j.dificultad}</span>
      </div>
      <div class="bento-body">
        <div class="metrics-row" style="margin-top: 0; padding-top: 0; border-top: none; margin-bottom: 0.85rem;">
          <div class="metric-item">
            <span class="metric-label">Ubicación</span>
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-primary);">${j.ubicacion}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Botín Mítico</span>
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--pastel-blue-text);">${j.drops}</span>
          </div>
        </div>
        <p><strong>Mecánica:</strong> ${j.mecanica}</p>
        <p><strong>Vulnerabilidad:</strong> ${j.debilidad}</p>
        <p style="margin-top: 0.65rem; padding: 0.65rem 0.85rem; background: var(--bg-surface-subtle); border-radius: var(--radius-xs); font-size: 0.82rem; color: var(--text-secondary);">
          <strong>Táctica de la Orden:</strong> ${j.estrategia}
        </p>
      </div>
      <div class="bento-footer">
        <span>Fase de Encuentro</span>
        <span>Tier ${j.tier}</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   DATOS: DIRECTORIO DE MODS
   ========================================================================== */

const MODS_DATA = [
  { nombre: "L_Ender's Cataclysm", cat: "jefes", desc: "Jefes titánicos de mazmorras colosales (Netherite Monstrosity, Ignis, Harbinger, Leviathan)." },
  { nombre: "Aquamirae", cat: "jefes", desc: "Océanos gélidos, criaturas abisales y el buque espectral de la Capitana Cornelia." },
  { nombre: "Mowzie's Mobs", cat: "jefes", desc: "Jefes con animaciones dinámicas: Ferrous Wroughtnaut y Frostmaw." },
  { nombre: "The Graveyard", cat: "jefes", desc: "Cementerios, criptas subterráneas y el encuentro con el Lich." },
  { nombre: "Mutant Monsters", cat: "jefes", desc: "Variantes mutadas de las criaturas básicas de Minecraft." },
  { nombre: "Bosses of Mass Destruction", cat: "jefes", desc: "Jefes de mundo abierto: Night Lich y Void Blossom." },
  { nombre: "Alex's Mobs", cat: "mundo", desc: "Fauna realista y criaturas míticas, incluyendo el Void Worm." },
  { nombre: "Better Combat", cat: "combate", desc: "Sistema de combate fluido, combos de armas y rodadas evasivas con I-frames." },
  { nombre: "Marium's Soulslike Weaponry", cat: "combate", desc: "Armamento legendario y mecánicas inspiradas en obras Soulslike." },
  { nombre: "Armor of the Ages", cat: "combate", desc: "Sets históricos de armaduras samurái, centurión y caballeros." },
  { nombre: "Knight Quest Reforged", cat: "combate", desc: "Armamento medieval y componentes de caballería." },
  { nombre: "When Dungeons Arise", cat: "mundo", desc: "Fortalezas aéreas, palacios en ruinas y mazmorras a gran escala." },
  { nombre: "Incendium", cat: "mundo", desc: "Reestructuración total del Nether con volcanes y ciudades flotantes." },
  { nombre: "Takes a Pillage", cat: "mundo", desc: "Campamentos avanzados y puestos de asedio de saqueadores." },
  { nombre: "Tax Castle Pillager", cat: "mundo", desc: "Castillos feudales gobernados por señores de la guerra." },
  { nombre: "Dungeons and Taverns", cat: "mundo", desc: "Tabernas, torres y mazmorras terrestres." },
  { nombre: "Paraglider", cat: "utilidad", desc: "Planeador y sistema de resistencia/estamina en tiempo real." },
  { nombre: "PlayerRevive", cat: "utilidad", desc: "Mecánica cooperativa de desangrado (60s) y reanimación (5s)." },
  { nombre: "Sophisticated Backpacks", cat: "utilidad", desc: "Mochilas modulares con mejoras de imán, fundición y compresión." },
  { nombre: "Waystones", cat: "utilidad", desc: "Monolitos de teletransporte rápido entre bases y arenas." },
  { nombre: "Xaero's Minimap & WorldMap", cat: "utilidad", desc: "Minimapa y mapa mundial con waypoints y cartografía." },
  { nombre: "Human Companions", cat: "utilidad", desc: "Soldados y acompañantes NPC reclutables para la guarnición." },
  { nombre: "Boss Checklist", cat: "utilidad", desc: "Registro interactivo en tecla K para verificar jefes abatidos." },
  { nombre: "Lootr", cat: "utilidad", desc: "Cofres instanciados individualmente para distribución equitativa de botín." }
];

function renderMods(filterCat = 'all', searchQuery = '') {
  const container = document.getElementById('mods-table-body');
  if (!container) return;

  const filtered = MODS_DATA.filter(m => {
    const matchesCat = (filterCat === 'all' || m.cat === filterCat);
    const matchesSearch = m.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 2rem; color: var(--text-muted);">No se encontraron módulos coincidentes.</td></tr>`;
    return;
  }

  container.innerHTML = filtered.map(m => `
    <tr>
      <td style="font-weight: 600; color: var(--text-primary); font-family: var(--font-sans);">${m.nombre}</td>
      <td>
        <span class="tag-pastel ${m.cat === 'jefes' ? 'red' : m.cat === 'combate' ? 'yellow' : m.cat === 'mundo' ? 'purple' : 'blue'}">
          ${m.cat.toUpperCase()}
        </span>
      </td>
      <td style="color: var(--text-body);">${m.desc}</td>
    </tr>
  `).join('');
}

/* ==========================================================================
   BUSCADOR Y FILTROS REACTIVOS
   ========================================================================== */

function initSearchAndFilters() {
  const modSearch = document.getElementById('mod-search-input');
  const modFilters = document.querySelectorAll('.mod-filter-btn');
  let currentModCat = 'all';

  if (modSearch) {
    modSearch.addEventListener('input', (e) => {
      renderMods(currentModCat, e.target.value);
    });
  }

  modFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      modFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentModCat = btn.getAttribute('data-cat');
      renderMods(currentModCat, modSearch ? modSearch.value : '');
    });
  });

  const bossFilters = document.querySelectorAll('.boss-filter-btn');
  bossFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      bossFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tier = btn.getAttribute('data-tier');
      renderJefes(tier);
    });
  });
}
