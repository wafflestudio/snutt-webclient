import React from 'react';
// import TopBar from './TopBar.jsx';
import Header from './Header';
import Footer from './footer.jsx';

// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         <Header />
//         {this.props.children}
//         <Footer />
//       </div>
//     );
//   }
// }

const App = props => (
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default App;
