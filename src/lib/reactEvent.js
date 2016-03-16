import _ from 'lodash';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import traverseAllChildren from 'react/lib/traverseAllChildren';
import iterator from './iterator';
//import traverseAllChildren from 'react/lib/traverseAllChildren';
import ReactDOM from 'react-dom';

function componentOn(component, option) {

  return (event, listener) => {
    if (_.isFunction(listener)) {
      if (_.isUndefined(component.__eventQueue[event])) {
        component.__eventQueue[event] = [];
      }
      component.__eventQueue[event].push({
        callback: listener,
        option: option
      });
      return true;
    }

    return false;
  }
}


function componentOff(component) {

  return (event, listener) => {
    if (_.isUndefined(listener)) {

      delete component.__eventQueue[event];

    } else if (_.isFunction(listener)) {
      component.__eventQueue[event] = component.__eventQueue[event].filter((_listener_) => {
        return _listener_.callback.name !== listener.name
      });
    }
  }
}

function componentEmit(component, option) {

  return (event, args) => {
    iterator.parents(component, parent => {
      console.log(parent);
      return false;
    });

  }
}

function componentBroadcast(component, option) {

  return (event, args) => {
    //iterator.children(component, (_component_) => {
    //  console.log(_component_);
    //
    //  return true;
    //});
  }
}

export default (component, option) => {

  //const __global__ = getGlobalObject();
  //
  //if (option && option.isRoot) {
  //  __global__.__ReactEventRoot = component;
  //}

  component.__eventQueue = {};


  component.on = componentOn(component, {});
  component.once = componentOn(component, {
    once: true
  });
  component.off = componentOff(component);
  component.emit = componentEmit(component);
  component.broadcast = componentBroadcast(component);

}