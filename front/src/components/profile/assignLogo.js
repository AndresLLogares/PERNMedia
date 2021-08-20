import { Javascript } from '@styled-icons/boxicons-logos/Javascript';
import { Java } from '@styled-icons/fa-brands/Java';
import { ReactLogo } from '@styled-icons/boxicons-logos/ReactLogo';
import { Python } from '@styled-icons/boxicons-logos/Python';
import { Mysql } from '@styled-icons/simple-icons/Mysql';
import { Postgresql } from '@styled-icons/simple-icons/Postgresql';
import { Html5 } from '@styled-icons/boxicons-logos/Html5';
import { Css3 } from '@styled-icons/boxicons-logos/Css3';
import { CPlusPlus } from '@styled-icons/boxicons-logos/CPlusPlus';
import { Mongodb } from '@styled-icons/simple-icons/Mongodb';
import { Express } from '@styled-icons/simple-icons/Express';
import { Nodejs } from '@styled-icons/boxicons-logos/Nodejs';
import { Yarn } from '@styled-icons/fa-brands/Yarn';
import { Angular } from '@styled-icons/boxicons-logos/Angular';
import { Php } from '@styled-icons/fa-brands/Php';
import { Rubyonrails } from '@styled-icons/simple-icons/Rubyonrails';
import { Flutter } from '@styled-icons/remix-fill/Flutter';

const assignLogo = (array) => {
    array = array.map(item => {
        if (item === 'Javascript') {
            item = { name: 'Javascript', logo: Javascript }
        }
        else if (item === 'Java') {
            item = { name: 'Java', logo: Java }
        }
        else if (item === 'React') {
            item = { name: 'React', logo: ReactLogo }
        }
        else if (item === 'Python') {
            item = { name: 'Python', logo: Python }
        }
        else if (item === 'Mysql') {
            item = { name: 'Mysql', logo: Mysql }
        }
        else if (item === 'Postgresql') {
            item = { name: 'Postgresql', logo: Postgresql }
        }
        else if (item === 'Html') {
            item = { name: 'Html', logo: Html5 }
        }
        else if (item === 'CSS') {
            item = { name: 'CSS', logo: Css3 }
        }
        else if (item === 'C++') {
            item = { name: 'C++', logo: CPlusPlus }
        }
        else if (item === 'Mongodb') {
            item = { name: 'Mongodb', logo: Mongodb }
        }
        else if (item === 'Express') {
            item = { name: 'Express', logo: Express }
        }
        else if (item === 'Nodejs') {
            item = { name: 'Nodejs', logo: Nodejs }
        }
        else if (item === 'Yarn') {
            item = { name: 'Yarn', logo: Yarn }
        }
        else if (item === 'Angular') {
            item = { name: 'Angular', logo: Angular }
        }
        else if (item === 'PHP') {
            item = { name: 'PHP', logo: Php }
        }
        else if (item === 'Rubyonrails') {
            item = { name: 'Rubyonrails', logo: Rubyonrails }
        }
        else if (item === 'Flutter') {
            item = { name: 'Flutter', logo: Flutter }
        }
        return item;
    })
    return array;
}

export default assignLogo;