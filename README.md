# CinéVoraces | Front

## Rules

### Javascript
- Components
```tsx
function Home() {
  return(
    <div>
      ...Your stuff...
    </div>
  );
};

export default Home;
// Or
export { Home };
```

- Functions
```tsx
const jambon = () => {
      ...Your stuff...
};

export default jambon;
// Or
export { jambon };
```
---
### TypeScript
- Module declaration
```typescript
declare module '*.x' {
  // Replace x with your extension
  const classes: { [key: string]: string };
  export default classes;
}
```
- Import types from module
```typescript
// /!\ Classic imports are forbidden, do not /!\
type newLayout = {
  children?: import('react').ReactNode
};
```
Use *"type"* for one shot typing, try to maximuse usage of *"interface"* for global typing in order to extends them for new.

---
### SCSS
Use exclusively **BEM** for your classes, **nesting is forbidden** except for specials cases like with *<span\>* tags.  
See example below :
```scss
.head {
  // ... My CSS rules ...
}
.head__title {
  // ...
  & span {
  // ...
  }
}
.head__title__jambon {
  // ...
}
```
If you need to give multiple classes to one tag :
```javascript
<div className={`${styles.jambon} ${styles.zob}`}>Je kiffe le jambon</div>
```
If you need to give a class that contain "-" (try to avoid using "-" as much as possible, in order to keep things simple) :
```javascript
<div className={styles['jambon-beurre']}>Je kiffe le jambon</div>
```
To use global types you nedd to extend them like in example below :
```scss
.title {
  @extend .h1;
  color: #f0f;
}
// Add for multiple extends:
.title {
  @extend .h1, .section;
  color: #f0f;
}
```
