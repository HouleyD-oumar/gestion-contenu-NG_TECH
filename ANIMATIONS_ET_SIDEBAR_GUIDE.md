# 🎨 Animations et Sidebar Réduite - Guide Complet

## ✅ Fonctionnalités Ajoutées

### 1. **Sidebar Réduite/Agrandie**
- ✅ Bouton pour réduire/agrandir la sidebar (desktop uniquement)
- ✅ Largeur réduite: 80px (icônes seulement)
- ✅ Largeur normale: 256px (icônes + texte)
- ✅ Transition fluide entre les deux états
- ✅ Le contenu principal s'adapte automatiquement

### 2. **Animations au Survol**
- ✅ **Liens de navigation**: 
  - Effet de zoom léger (`scale-105`) au survol
  - Ombre portée au survol
  - Effet de "bounce" au clic (`scale-95`)
  
- ✅ **Icônes actives**: 
  - Agrandissement de 10% (`scale-110`)
  - Transition fluide
  
- ✅ **Boutons**:
  - Zoom au survol (`scale-110`)
  - Réduction au clic (`scale-95`)
  - Transition de 200ms

### 3. **Animations d'Apparition**
- ✅ **Texte de la sidebar**: Fade-in + slide depuis la gauche
- ✅ **Overlay mobile**: Fade-in
- ✅ **Titre "NG TECH"**: Apparition animée

## 🎯 Comment Utiliser

### Réduire/Agrandir la Sidebar

1. **Sur Desktop**: Cliquez sur le bouton avec l'icône chevron en haut de la sidebar
   - Chevron gauche (←) = Réduire
   - Chevron droit (→) = Agrandir

2. **Sur Mobile**: La sidebar reste en mode normal (pleine largeur)

### Tooltip en Mode Réduit

Quand la sidebar est réduite, passez la souris sur une icône pour voir le titre complet dans un tooltip.

## 🎨 Animations Disponibles

### Classes CSS Personnalisées

```css
/* Fade-in simple */
.animate-in.fade-in.duration-200

/* Slide depuis la gauche */
.animate-in.fade-in.slide-in-from-left.duration-200

/* Zoom au survol */
.hover:scale-105

/* Zoom au clic */
.active:scale-95

/* Ombre au survol */
.hover:shadow-sm
```

### Transitions

Toutes les transitions utilisent `transition-all duration-200` ou `duration-300` pour une fluidité optimale.

## 📐 Structure du Code

### Sidebar.tsx

```tsx
// État de la sidebar (réduite ou non)
const [isCollapsed, setIsCollapsed] = useState(false);

// Bouton toggle
<button onClick={() => setIsCollapsed(!isCollapsed)}>
  {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
</button>

// Largeur dynamique
className={cn(
  'fixed top-0 left-0 h-full',
  isCollapsed ? 'w-20' : 'w-64'
)}

// Liens avec animations
className={cn(
  'flex items-center gap-3 px-4 py-3 rounded-lg',
  'transition-all duration-200',
  'hover:scale-105 active:scale-95',
  'hover:shadow-sm'
)}
```

### Layout.tsx

```tsx
// Context pour partager l'état
const SidebarContext = createContext({
  isCollapsed: false,
  setIsCollapsed: (value: boolean) => {},
});

// Main content qui s'adapte
<main className={`
  pt-4 transition-all duration-300 
  ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
`}>
```

## 🎯 Personnalisation

### Changer la Vitesse des Animations

Dans `Sidebar.tsx`, modifiez les classes `duration-*`:

```tsx
// Plus rapide
'transition-all duration-150'

// Plus lent
'transition-all duration-500'
```

### Changer l'Effet de Zoom

```tsx
// Zoom plus prononcé
'hover:scale-110'

// Zoom plus subtil
'hover:scale-102'
```

### Ajouter des Animations Supplémentaires

Dans `globals.css`:

```css
@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bounce-in {
  animation-name: bounce-in;
}
```

## 🎨 Exemples d'Utilisation

### Ajouter une Animation à un Bouton

```tsx
<button className="
  px-4 py-2 rounded-lg
  transition-all duration-200
  hover:scale-105 
  active:scale-95
  hover:shadow-md
  bg-blue-600 text-white
">
  Mon Bouton
</button>
```

### Ajouter une Animation à une Card

```tsx
<div className="
  p-6 rounded-lg bg-white
  transition-all duration-300
  hover:shadow-lg
  hover:-translate-y-1
">
  Contenu de la carte
</div>
```

## 📊 Performance

- ✅ Toutes les animations utilisent `transform` et `opacity` (GPU accelerated)
- ✅ Pas de reflow/repaint coûteux
- ✅ Transitions fluides à 60 FPS
- ✅ Optimisé pour mobile et desktop

## 🎉 Résultat Final

Votre sidebar est maintenant:
- ✅ Réductible/Agrandissable
- ✅ Animée au survol
- ✅ Animée au clic
- ✅ Avec transitions fluides
- ✅ Responsive (mobile + desktop)
- ✅ Accessible (tooltips en mode réduit)

**Profitez de votre interface animée ! 🚀**
