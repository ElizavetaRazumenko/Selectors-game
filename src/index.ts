import './global.css';
import { Render } from './components/rendering/rendering';
import { LevelRealization } from './components/game-logic/levelRealization';
import { returnsPageRenderTypes } from './types/index';

const arrayOfUsedElements: returnsPageRenderTypes = new Render().pageRender();
new LevelRealization(arrayOfUsedElements).start();
