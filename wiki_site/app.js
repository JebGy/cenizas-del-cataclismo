/**
 * CENIZAS DEL CATACLISMO — WIKI & CRÓNICAS DE RAYCRESARK
 * Motor de la aplicación SPA, Datos y Enrutador
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  renderJugadores();
  renderClases();
  renderJefes();
  renderMods();
  initSearchAndFilters();
});

/* ==========================================================================
   ENRUTADOR CLIENT-SIDE (SPA)
   ========================================================================== */

function initRouter() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  function navigate(targetId) {
    const validTargets = ['history', 'wiki', 'mods', 'jugadores', 'clases', 'jefes', 'progresion'];
    const activeTarget = validTargets.includes(targetId) ? targetId : 'wiki';

    // Update active nav links
    navLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-target') || link.getAttribute('href').replace('#', '');
      if (linkTarget === activeTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update active sections
    sections.forEach(sec => {
      if (sec.id === `view-${activeTarget}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click on nav items
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target') || link.getAttribute('href').replace('#', '');
      window.location.hash = target;
      navigate(target);
    });
  });

  // Handle hash change & initial load
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'wiki';
    navigate(hash);
  });

  const initialHash = window.location.hash.replace('#', '') || 'wiki';
  navigate(initialHash);
}

/* ==========================================================================
   DATOS: JUGADORES DE LA MESA REDONDA
   ========================================================================== */

const JUGADORES_DATA = [
  {
    nombre: "Tú (El Conquistador)",
    titulo: "Rey de Raycresark & Campeón del Trono",
    arquetipo: "Líder Supremo / Estratega de Guerra",
    iconoColor: "gold",
    isKing: true,
    estado: "En el Trono",
    arma: "Espada Real del Conquistador & Escudo Blasón",
    armadura: "Armadura Real de Caballero de Raycresark",
    deber: "Gobernanza del reino, diplomacia bélica, asignación de misiones y mando supremo en asedios.",
    habilidad: "Decreto Real (Coordinación y bonificación de moral en combate)",
    bio: "El guerrero que penetró las defensas de Raycresark, abatió al antiguo tirano en combate singular y encendió el faro de la Mesa Redonda para convocar a sus camaradas."
  },
  {
    nombre: "Pedro",
    titulo: "Gran Mariscal de la Guardia Real",
    arquetipo: "Vanguardia Pesada / Tanque de Asedio",
    iconoColor: "crimson",
    isKing: false,
    estado: "Convocado",
    arma: "Hacha de Guerra & Escudo de Torre Reforzado",
    armadura: "Set Samurai / Placas de Acero (Armor of the Ages)",
    deber: "Custodia de las puertas y murallas, atracción del agro de titanes y liderazgo de la vanguardia.",
    habilidad: "Muralla Inquebrantable (Reducción de daño y bloqueo frontal)",
    bio: "Guardián legendario de temple férreo. Capaz de sostener la embestida de criaturas mutantes y abrir paso entre las líneas enemigas con golpes de escudo."
  },
  {
    nombre: "Cristhian",
    titulo: "Maestro de Bestias y Explorador Real",
    arquetipo: "Ranger / Cartógrafo / Domador",
    iconoColor: "emerald",
    isKing: false,
    estado: "Convocado",
    arma: "Arco Recurvo Largo & Daga Silenciosa",
    armadura: "Cuero Reforzado Ligero con Paraglider",
    deber: "Cartografía de biomas lejanos (Xaero's Map), doma de monturas y bestias de Alex's Mobs.",
    habilidad: "Ojo de Halcón (Disparo crítico a distancia y reconocimiento aéreo)",
    bio: "Rastreador incansable de los páramos. Sus flechas alcanzan objetivos antes de que se percaten de su presencia y su afinidad con la fauna salvaje provee de monturas al reino."
  },
  {
    nombre: "Marcos",
    titulo: "Gran Maestre Alquimista y Médico de la Orden",
    arquetipo: "Soporte Vital / Alquimia & Reanimación",
    iconoColor: "cyan",
    isKing: false,
    estado: "Convocado",
    arma: "Vara de Concentración & Daga Alquímica",
    armadura: "Túnica de Protección y Mochila con Inyector",
    deber: "Gestión de huertos medicinales, producción de pociones de salpicadura y rescate médico (PlayerRevive).",
    habilidad: "Resurrección de Emergencia (Reanimación acelerada en batalla)",
    bio: "Erudito conocedor de las mezclas botánicas y los secretos de las almas. Su presencia asegura que ningún hermano perezca en el desangrado durante las cruzadas."
  },
  {
    nombre: "Alexandre",
    titulo: "Alto Forjador e Ingeniero del Reino",
    arquetipo: "Coloso de Acero / Maestro Minero",
    iconoColor: "purple",
    isKing: false,
    estado: "Convocado",
    arma: "Gran Maza de Dos Manos & Picos de Diamante",
    armadura: "Armadura Pesada de Herrería Reforzada",
    deber: "Excavación de yacimientos profundos (Y=-58), automatización de mochilas y forja de armamento imperial.",
    habilidad: "Golpe Sísmico (Demolición de blindajes y control de masas)",
    bio: "Señor de las cavernas y del fuego del yunque. Nadie conoce mejor las profundidades de la tierra ni transforma el mineral en acero con tanta maestría."
  },
  {
    nombre: "César",
    titulo: "Gran Cazador de Sombras",
    arquetipo: "DPS Crítico / Asesino Sigiloso",
    iconoColor: "crimson",
    isKing: false,
    estado: "Convocado",
    arma: "Dagas Dobles Gemelas / Espadas Rápidas",
    armadura: "Set de Cuero Oscuro de Sigilo",
    deber: "Infiltración en criptas de The Graveyard, flanqueo de jefes y ejecución de objetivos prioritarios.",
    habilidad: "Danza de Sombras (Rodada evasiva I-frames y críticos por la espalda)",
    bio: "Asesino letal entrenado para moverse en la penumbra. Explota cada ventana de vulnerabilidad de los jefes para causar un daño devastador."
  }
];

function renderJugadores() {
  const container = document.getElementById('jugadores-grid');
  if (!container) return;

  container.innerHTML = JUGADORES_DATA.map(j => `
    <div class="player-card ${j.isKing ? 'king' : ''}">
      <div class="card-header">
        <div class="card-title-group">
          <h4>${j.nombre}</h4>
          <div class="card-subtitle">${j.titulo}</div>
        </div>
        <div class="player-avatar">
          ${j.isKing ? getSvgIcon('crown') : getSvgIcon(j.iconoColor === 'emerald' ? 'bow' : j.iconoColor === 'cyan' ? 'potion' : j.iconoColor === 'purple' ? 'hammer' : 'sword')}
        </div>
      </div>
      <div class="card-body">
        <div class="player-meta">
          <div class="player-meta-item">
            <div class="meta-label">Arquetipo</div>
            <div class="meta-val">${j.arquetipo}</div>
          </div>
          <div class="player-meta-item">
            <div class="meta-label">Estado</div>
            <div class="meta-val">
              <span class="badge ${j.isKing ? 'badge-gold' : 'badge-emerald'}">${j.estado}</span>
            </div>
          </div>
          <div class="player-meta-item">
            <div class="meta-label">Armamento</div>
            <div class="meta-val">${j.arma}</div>
          </div>
          <div class="player-meta-item">
            <div class="meta-label">Protección</div>
            <div class="meta-val">${j.armadura}</div>
          </div>
        </div>
        <p><strong>Deber en Raycresark:</strong> ${j.deber}</p>
        <p><strong>Habilidad Distintiva:</strong> <span style="color: var(--text-gold);">${j.habilidad}</span></p>
        <p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic;">"${j.bio}"</p>
      </div>
      <div class="card-footer">
        <span>Consejo de Raycresark</span>
        <span class="badge badge-gold">Mesa Redonda</span>
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
    icono: "shield",
    vida: 95,
    danio: 65,
    movilidad: 45,
    soporte: 70,
    armas: "Espada & Escudo Pesado, Maza de Placas",
    ventajas: ["Reducción de 30% al daño frontal con escudo levantado", "Atracción natural del agro enemigo", "Resistencia al empuje de jefes gigantes"]
  },
  {
    nombre: "Cazador de Sombras",
    rol: "DPS Ágil / Asesino",
    icono: "sword",
    vida: 60,
    danio: 95,
    movilidad: 90,
    soporte: 30,
    armas: "Dagas Duales, Katanas, Espadas Rápidas",
    ventajas: ["Frames de invulnerabilidad aumentados al rodar (R)", "+40% de daño crítico golpeando por la espalda", "Velocidad de ataque incrementada en Better Combat"]
  },
  {
    nombre: "Maestro de Bestias",
    rol: "Ranger / Explorador Aéreo",
    icono: "bow",
    vida: 70,
    danio: 80,
    movilidad: 85,
    soporte: 65,
    armas: "Arcos Largos, Ballestas, Lanzas de Caza",
    ventajas: ["Menor consumo de estamina al planear con Paraglider", "Bonificación al domar y curar bestias de Alex's Mobs", "Visión táctica de objetivos lejanos"]
  },
  {
    nombre: "Médico de Batalla",
    rol: "Sanador / Alquimista",
    icono: "potion",
    vida: 65,
    danio: 50,
    movilidad: 60,
    soporte: 100,
    armas: "Varas de Alma, Pociones de Salpicadura, Dagas",
    ventajas: ["Velocidad de reanimación reducida a 3s en PlayerRevive", "Efecto duplicado en pociones curativas arrojadas", "Aura pasiva de regeneración de estamina a aliados"]
  },
  {
    nombre: "Berserker Forjador",
    rol: "Coloso / Demoledor de Masas",
    icono: "hammer",
    vida: 90,
    danio: 90,
    movilidad: 40,
    soporte: 50,
    armas: "Grandes Espadas a Dos Manos, Mazas Pesadas",
    ventajas: ["Ataques en área con gran arco de demolición", "Rompe guardias y aturde a enemigos blindados", "+50% de velocidad al minar en capas profundas"]
  },
  {
    nombre: "Caballero Comandante",
    rol: "Líder Híbrido / Táctico",
    icono: "crown",
    vida: 80,
    danio: 75,
    movilidad: 70,
    soporte: 80,
    armas: "Lanza de Caballería, Espada Larga y Estandarte",
    ventajas: ["Inspiración militar que aumenta el daño de aliados", "Bonificación de salud a soldados reclutados (Human Companions)", "Coordinación en asedios y defensas de fortalezas"]
  }
];

function renderClases() {
  const container = document.getElementById('clases-grid');
  if (!container) return;

  container.innerHTML = CLASES_DATA.map(c => `
    <div class="class-card">
      <div class="card-header">
        <div class="card-title-group">
          <h4>${c.nombre}</h4>
          <div class="card-subtitle">${c.rol}</div>
        </div>
        <div class="card-icon">
          ${getSvgIcon(c.icono)}
        </div>
      </div>
      <div class="card-body">
        <div class="stat-bar-group">
          <div class="stat-bar-item">
            <span class="stat-bar-label">Vitalidad</span>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${c.vida}%"></div></div>
            <span class="stat-bar-val">${c.vida}</span>
          </div>
          <div class="stat-bar-item">
            <span class="stat-bar-label">Ofensiva</span>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${c.danio}%"></div></div>
            <span class="stat-bar-val">${c.danio}</span>
          </div>
          <div class="stat-bar-item">
            <span class="stat-bar-label">Movilidad</span>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${c.movilidad}%"></div></div>
            <span class="stat-bar-val">${c.movilidad}</span>
          </div>
          <div class="stat-bar-item">
            <span class="stat-bar-label">Soporte</span>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width: ${c.soporte}%"></div></div>
            <span class="stat-bar-val">${c.soporte}</span>
          </div>
        </div>
        <p><strong>Armamento Inicial:</strong> ${c.armas}</p>
        <p><strong>Rasgos Pasivos:</strong></p>
        <ul class="card-list">
          ${c.ventajas.map(v => `<li>${v}</li>`).join('')}
        </ul>
      </div>
      <div class="card-footer">
        <span>Arquetipo Oficial</span>
        <span class="badge badge-gold">Manual de Inicio</span>
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
    mecanica: "El zombi resucita hasta 3 veces si no lo quemas al caer noqueado. El esqueleto dispara ráfagas de flechas múltiples y salta provocando impactos de choque.",
    debilidad: "Fuego continuo para evitar resurrección; esquivar el impacto con rodada (R).",
    drops: "Hulk Hammer, restos mutantes, XP masiva.",
    estrategia: "Pedro bloquea con escudo frontal; Alexandre y César rematan en el suelo y prenden con mechero."
  },
  {
    tier: 1,
    nombre: "Ferrous Wroughtnaut",
    mod: "Mowzie's Mobs",
    ubicacion: "Cámaras acorazadas subterráneas (Y: -20 a 20)",
    dificultad: "Media",
    mecanica: "Inmune a todo daño frontal. Clava su hacha gigante en la roca durante 3 segundos tras un golpe vertical.",
    debilidad: "Punto débil en la espalda mientras su hacha está atascada.",
    drops: "Wrought Helm (Casco indestructible), Axe of the Thousand Metal.",
    estrategia: "El tanque provoca el hachazo; los DPS ruedan hacia la espalda para clavar ataques críticos."
  },
  {
    tier: 1,
    nombre: "Frostmaw",
    mod: "Mowzie's Mobs",
    ubicacion: "Cimas nevadas y montañas glaciares",
    dificultad: "Media",
    mecanica: "Aliento de hielo continuo que ralentiza y congela. Salto de demolición en área.",
    debilidad: "Daño ígneo y rotación continua alrededor de su cuerpo.",
    drops: "Ice Crystal (Rayo de escarcha continuo).",
    estrategia: "Cristhian hostiga a distancia con flechas mientras el grupo esquiva el aliento de hielo."
  },
  {
    tier: 1,
    nombre: "The Corrupted Champion / Lich",
    mod: "The Graveyard",
    ubicacion: "Criptas y Cementerios gigantescos",
    dificultad: "Media-Alta",
    mecanica: "Invoca esbirros no-muertos y crea charcos oscuros que aplican efecto Decay/Wither continuo.",
    debilidad: "Pociones curativas, cubos de leche y daño sagrado/fuego.",
    drops: "Reliquias oscuras, Fragmentos de Alma, gemas de estamina.",
    estrategia: "Marcos mantiene a todos con vida con salpicaduras mientras César caza al Lich."
  },
  {
    tier: 2,
    nombre: "Ghost of Captain Cornelia",
    mod: "Aquamirae",
    ubicacion: "Barco sumergido en el Océano Helado",
    dificultad: "Alta",
    mecanica: "Embestidas a gran velocidad, invocación de clones de hielo y torbellino de congelación abisal.",
    debilidad: "Daño de Fuego constante para mitigar su regeneración.",
    drops: "Terrible Sword, Divider, Golden Feather, materiales de escamas.",
    estrategia: "Llevar pociones de respiración acuática. Destruir clones rápido antes de que congelen al grupo."
  },
  {
    tier: 3,
    nombre: "Netherite Monstrosity",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Monstrous Forge (Nether)",
    dificultad: "Muy Alta",
    mecanica: "Terremotos masivos con martillos colosales y disparos de lava fundida.",
    debilidad: "Movimiento constante con Paraglider en altura; golpeo en las patas tras sus ataques.",
    drops: "Monstrous Horn, Lingotes de Netherite Puro, The Incinerator.",
    estrategia: "Subirse a las plataformas altas; no quedarse en el suelo durante el golpe doble de martillo."
  },
  {
    tier: 3,
    nombre: "Ignis",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Burning Arena (Nether)",
    dificultad: "Muy Alta",
    mecanica: "Fase 1 con escudo y espada pesada; Fase 2 con doble espada llameante, levitación y columnas de fuego.",
    debilidad: "Pociones de Resistencia al Fuego obligatorias; esquivar su caída en picada con doble rodada.",
    drops: "Ignitium Ingot (Armadura inmune a fuego), The Incinerator.",
    estrategia: "Nunca golpear su escudo de frente para no ser aturdido. El grupo debe atacar en abanico."
  },
  {
    tier: 4,
    nombre: "The Harbinger",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Ancient Factory (Profundidades Overworld)",
    dificultad: "Épica",
    mecanica: "Láser carmesí de carga continua, misiles teledirigidos de Wither y escudo deflector eléctrico.",
    debilidad: "Cubrirse detrás de columnas; atacarlo cuerpo a cuerpo cuando activa su escudo eléctrico.",
    drops: "Witherite Ingot, Laser Gatling, Netherite Mechanical Arm.",
    estrategia: "Combate de posicionamiento estricto. El tanque usa escudo de torre para interceptar misiles."
  },
  {
    tier: 4,
    nombre: "Void Worm",
    mod: "Alex's Mobs",
    ubicacion: "El Vacío del End (Invocar con Mysterious Worm)",
    dificultad: "Épica",
    mecanica: "Coloso volador de múltiples segmentos que abre portales interdimensionales.",
    debilidad: "Golpear los segmentos luminosos del cuerpo (la cabeza es ultra resistente).",
    drops: "Void Worm Eye, Void Worm Mandible (para craftear el Dimensional Carver).",
    estrategia: "Uso obligatorio de Paraglider o Elytra para no caer al vacío infinito."
  },
  {
    tier: 5,
    nombre: "The Leviathan",
    mod: "L_Ender's Cataclysm",
    ubicacion: "Sunken City (Fosa Abisal del End)",
    dificultad: "Legendaria / Jefe Final",
    mecanica: "3 fases subacuáticas, 4 núcleos orbitales que le dan invulnerabilidad y vórtice de Agujero Negro.",
    debilidad: "Destruir primero los 4 orbes dimensionales y nadar en dirección opuesta al vórtice.",
    drops: "Abyssal Sacrifice, Tidal Claws, Título de Campeón de las Cenizas.",
    estrategia: "Toda la Mesa Redonda al máximo nivel, tótems de inmortalidad y pociones de fuerza II."
  }
];

function renderJefes(filterTier = 'all') {
  const container = document.getElementById('jefes-grid');
  if (!container) return;

  const filtered = filterTier === 'all' 
    ? JEFES_DATA 
    : JEFES_DATA.filter(j => j.tier.toString() === filterTier);

  container.innerHTML = filtered.map(j => `
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <h4>${j.nombre}</h4>
          <div class="card-subtitle">${j.mod} — Tier ${j.tier}</div>
        </div>
        <div class="card-icon ${j.tier >= 4 ? 'purple' : j.tier >= 3 ? 'crimson' : 'gold'}">
          ${getSvgIcon(j.tier >= 4 ? 'skull' : 'sword')}
        </div>
      </div>
      <div class="card-body">
        <div class="player-meta">
          <div class="player-meta-item">
            <div class="meta-label">Ubicación</div>
            <div class="meta-val">${j.ubicacion}</div>
          </div>
          <div class="player-meta-item">
            <div class="meta-label">Dificultad</div>
            <div class="meta-val">
              <span class="badge ${j.tier >= 4 ? 'badge-purple' : j.tier >= 3 ? 'badge-crimson' : 'badge-gold'}">${j.dificultad}</span>
            </div>
          </div>
        </div>
        <p><strong>Mecánica:</strong> ${j.mecanica}</p>
        <p><strong>Debilidad:</strong> <span style="color: var(--text-gold);">${j.debilidad}</span></p>
        <p><strong>Botín Mítico:</strong> <span style="color: var(--text-cyan);">${j.drops}</span></p>
        <p style="margin-top: 0.5rem; font-size: 0.82rem; color: var(--text-secondary); background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: 4px;">
          <strong>Táctica de Raycresark:</strong> ${j.estrategia}
        </p>
      </div>
      <div class="card-footer">
        <span>Cenizas del Cataclismo</span>
        <span class="badge badge-muted">Tier ${j.tier}</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   DATOS: DIRECTORIO DE MODS
   ========================================================================== */

const MODS_DATA = [
  { nombre: "L_Ender's Cataclysm", cat: "jefes", desc: "Jefes titánicos de mazmorras colosales (Netherite Monstrosity, Ignis, Harbinger, Leviathan)." },
  { nombre: "Aquamirae", cat: "jefes", desc: "Océanos gélidos, criaturas abisales y el barco fantasma de la Capitana Cornelia." },
  { nombre: "Mowzie's Mobs", cat: "jefes", desc: "Jefes con animaciones fluidas como el Ferrous Wroughtnaut y el temible Frostmaw." },
  { nombre: "The Graveyard", cat: "jefes", desc: "Cementerios embrujados, criptas subterráneas, esqueletos malditos y el jefe Lich." },
  { nombre: "Mutant Monsters", cat: "jefes", desc: "Versiones mutantes y aterradoras de los monstruos clásicos de Minecraft." },
  { nombre: "Bosses of Mass Destruction", cat: "jefes", desc: "Jefes de mundo abierto como el Night Lich y Void Blossom." },
  { nombre: "Alex's Mobs", cat: "criaturas", desc: "Docenas de criaturas salvajes realistas y míticas, incluyendo el colosal Void Worm." },
  { nombre: "Better Combat", cat: "combate", desc: "Sistema de combate fluido estilo Hack & Slash, combos de armas y rodadas con frames de invulnerabilidad." },
  { nombre: "Marium's Soulslike Weaponry", cat: "combate", desc: "Armamento legendario, katanas, ultra espadas y jefes inspirados en Dark Souls / Elden Ring." },
  { nombre: "Armor of the Ages", cat: "combate", desc: "Sets históricos de armaduras samurái, centurión y caballeros de la antigüedad." },
  { nombre: "Knight Quest Reforged", cat: "combate", desc: "Armaduras medievales de alta calidad y contenido de caballería." },
  { nombre: "When Dungeons Arise", cat: "mundo", desc: "Fortalezas aéreas, palacios en ruinas y mazmorras titánicas por todo el mapa." },
  { nombre: "Incendium", cat: "mundo", desc: "Transformación total del Nether con volcanes, ciudades flotantes y biomas extremos." },
  { nombre: "Takes a Pillage", cat: "mundo", desc: "Nuevos campamentos, arqueros y puestos de asedio de saqueadores." },
  { nombre: "Tax Castle Pillager", cat: "mundo", desc: "Castillos feudales gobernados por señores de la guerra y tropas recaudadoras." },
  { nombre: "Dungeons and Taverns", cat: "mundo", desc: "Tabernas acogedoras, torres y mazmorras medievales en el Overworld." },
  { nombre: "Paraglider", cat: "utilidad", desc: "Planeador y sistema de estamina / corazones estilo Zelda Breath of the Wild." },
  { nombre: "PlayerRevive", cat: "utilidad", desc: "Mecánica cooperativa de desangrado (60s) y reanimación manteniendo clic derecho 5s." },
  { nombre: "Sophisticated Backpacks", cat: "utilidad", desc: "Mochilas personalizables con mejoras de auto-smelt, imán, compresión y alimentación." },
  { nombre: "Waystones", cat: "utilidad", desc: "Piedras de teletransporte rápido entre aldeas, fortalezas y arenas de combate." },
  { nombre: "Xaero's Minimap & WorldMap", cat: "utilidad", desc: "Minimapa y mapa mundial con registro de waypoints y áreas exploradas." },
  { nombre: "Human Companions", cat: "utilidad", desc: "Compañeros humanos reclutables dándoles comida para patrullar y defender." },
  { nombre: "Boss Checklist", cat: "utilidad", desc: "Interfaz dentro del juego con tecla K para rastrear los jefes derrotados." },
  { nombre: "Lootr", cat: "utilidad", desc: "Cofres instanciados por jugador para que todos los miembros del equipo reciban botín." }
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
    container.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 2rem; color: var(--text-muted);">No se encontraron mods que coincidan con la búsqueda.</td></tr>`;
    return;
  }

  container.innerHTML = filtered.map(m => `
    <tr>
      <td style="font-weight: 700; color: var(--text-primary); font-family: var(--font-serif);">${m.nombre}</td>
      <td>
        <span class="badge ${m.cat === 'jefes' ? 'badge-crimson' : m.cat === 'combate' ? 'badge-gold' : m.cat === 'mundo' ? 'badge-purple' : 'badge-cyan'}">
          ${m.cat.toUpperCase()}
        </span>
      </td>
      <td style="color: var(--text-secondary);">${m.desc}</td>
    </tr>
  `).join('');
}

/* ==========================================================================
   BUSCADOR Y FILTROS
   ========================================================================== */

function initSearchAndFilters() {
  // Mods search and filter
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

  // Jefes tier filter
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

/* ==========================================================================
   LIBRERÍA DE ICONOS SVG VECTORIALES
   ========================================================================== */

function getSvgIcon(type) {
  const icons = {
    crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    sword: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>`,
    bow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3c5 0 9 4 9 9s-4 9-9 9"/><line x1="6" y1="3" x2="6" y2="21"/><line x1="6" y1="12" x2="21" y2="12"/><polyline points="18 9 21 12 18 15"/></svg>`,
    potion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v4l-4.5 7.5a4 4 0 0 0 3.5 6.5h6a4 4 0 0 0 3.5-6.5L14 6V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><path d="M9 13h6"/></svg>`,
    hammer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.5 8.5c-.8.8-2.2.8-3 0 0 0 0 0 0 0-.8-.8-.8-2.2 0-3L12 9"/><path d="M17.64 4.36 20.2 6.92a2 2 0 0 1 0 2.83l-1.41 1.41a2 2 0 0 1-2.83 0L13.4 8.6a2 2 0 0 1 0-2.83l1.41-1.41a2 2 0 0 1 2.83 0z"/><path d="m14 7 3 3"/></svg>`,
    skull: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a3 3 0 0 0 1.5-2.6 6.5 6.5 0 1 0-11 0A3 3 0 0 0 8 20"/></svg>`,
    book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  };
  return icons[type] || icons.shield;
}
