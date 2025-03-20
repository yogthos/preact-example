export default function Greeting({ name = 'World' }) {
    return (
      <div class="greeting">
        <h1>Hello, {name}!</h1>
      </div>
    );
  }