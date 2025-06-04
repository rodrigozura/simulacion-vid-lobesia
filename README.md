# 🐛 Simulador de Lobesia botrana - Impacto en Viñedos de La Rioja, Argentina

## 🌿 Introducción

La Lobesia botrana, conocida como "polilla del racimo de la vid", representa una amenaza fitosanitaria crítica para la viticultura en la región de Chilecito, provincia de La Rioja. Esta plaga, originaria de Europa, afecta directamente las flores y bayas de uva, provocando pérdidas de rendimiento y calidad. Además, facilita infecciones por hongos como *Botrytis cinerea*, deteriorando el valor enológico de la producción.

Las condiciones climáticas de Chilecito —veranos cálidos, inviernos secos y baja humedad— favorecen el desarrollo de múltiples generaciones anuales de esta plaga, haciendo urgente la planificación de estrategias de monitoreo, control y predicción de impactos.

---

## 🎯 Objetivos del Simulador

El simulador tiene como finalidad proporcionar una herramienta interactiva para estimar el impacto de *Lobesia botrana* sobre el cultivo de vid, considerando el tipo de uva (Malbec o Torrontés), el grado de infestación inicial y los métodos de control aplicados.

### Objetivos específicos

- **Cuantificar la pérdida de rendimiento** (kg/ha) por efecto de la plaga.
- **Simular el deterioro de la calidad enológica y comercial** de la uva.
- **Comparar variedades** (Malbec vs. Torrontés) en cuanto a susceptibilidad y daño.
- **Estimar el efecto de diferentes métodos de control**, considerando su efectividad por generación.
- **Proveer información predictiva** para la toma de decisiones técnicas por parte de productores, cooperativas y autoridades sanitarias.

---

## 🔧 Tecnologías y dependencias

Este simulador ha sido desarrollado en entorno **Next.js 15.2.4** con React 18, TailwindCSS y múltiples componentes de Radix UI para una experiencia de usuario moderna y accesible.

### 📦 Dependencias principales

```json
{
  "next": "15.2.4",
  "react": "^18.0.0",
  "tailwindcss": "^3.x",
  "react-hook-form": "^7.54.1",
  "zod": "^3.24.1",
  "recharts": "latest",
  "@radix-ui/react-*": "v1.x / v2.x",
  "lucide-react": "^0.454.0",
  "vaul": "^0.9.6",
  "sonner": "^1.7.1",
  "date-fns": "3.0.0"
}
```

---

## 🚀 Instalación y ejecución

Siga estos pasos para correr el simulador localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/simulador-lobesia-botrana.git
cd simulador-lobesia-botrana

# 2. Instalar dependencias
npm install

# 3. Correr el servidor de desarrollo
npm run dev
```

Una vez iniciado, el simulador estará disponible en `http://localhost:3000`.

---

## 📂 Estructura general

```
/components      → Componentes visuales del simulador
/hooks           → Lógica de simulación (grados-día, Poisson, control por generación)
/types           → Tipado de datos y configuraciones
/pages           → Pantallas principales del simulador
/public          → Recursos estáticos (imágenes, íconos)
```

---

## 🧪 Variables clave simuladas

- **Grados día acumulados**  
  Representan la suma diaria de temperaturas por encima de un umbral biológico, determinando el ritmo de desarrollo de *Lobesia botrana* y la fenología de la vid.

- **Densidad poblacional inicial (adultos por hectárea)**  
  Es la cantidad de adultos iniciales que da origen a la primera generación de la plaga, y se modela como una variable aleatoria (por ejemplo, Poisson).

- **Número de generaciones**  
  Determinado por los grados-día acumulados. Se estima que pueden presentarse hasta 4 generaciones por temporada en Chilecito.

- **Tipo de uva (Malbec o Torrontés Riojano)**  
  Variable que define el calendario de cosecha y el umbral de tolerancia al daño (más estricto en Torrontés por ser uva blanca aromática).

- **Métodos de control**  
  El usuario puede seleccionar entre distintos métodos (feromonas, confusión sexual, insecticidas, TIE), cada uno con diferentes porcentajes de efectividad por generación.

- **Daño por generación**  
  Reducción porcentual del rendimiento y calidad ocasionado por cada generación de larvas, ajustado según método de control.

- **Producción estimada (kg/ha)**  
  Rendimiento final de uva cosechable después de pérdidas directas e indirectas.

- **Calidad del vino**  
  Variable cualitativa que depende de la incidencia de podredumbres y deterioro enológico provocados por la plaga.

---

## 📖 Fuentes científicas utilizadas

- Herrera, J. et al. (2017). *Tabla de vida y parámetros poblacionales de Lobesia botrana en condiciones de laboratorio*. 
- Heit, G. et al. (2013). *Modelo de distribución potencial de Lobesia botrana en Argentina*. INTA – SENASA.
- Ministerio de Agricultura. (2020). *Densidad poblacional de Lobesia botrana en vid: Muestreo y modelos de predicción*.
- Phytoma España. (2004). *Índices de plaga en Lobesia botrana*.
- SAG Chile. (2023). *Instructivo de prospecciones visuales PNLb*.
- SENASA Argentina. *Programa Nacional de Control y Erradicación de Lobesia botrana*.

---

## 👥 Autores

Trabajo Final Integrador | UTN FRT - Comisión 4K3  
**Estudiantes:** Alderete, Frosoni, Medina, Orellana, Zurita  
**Docentes:** María Eugenia Teri y Mario Paredi
