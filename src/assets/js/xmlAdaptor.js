Ractive.adaptors.xml = {
  filter: function ( object ) {
    return object instanceof Node || object instanceof NodeList;
  },
  wrap: function ( ractive, object, keypath ) {
    var facade;

    if ( object instanceof Node ) {
      if ( !object.children.length ) {
        facade = object.textContent;
      } else {
        facade = {
          find: function ( selector ) {
            return object.querySelector( selector );
          },
          findAll: function ( selector ) {
            return object.querySelectorAll( selector );
          }
        };
      }
    }

    else {
      facade = Array.prototype.slice.call( object );
    }

    return {
      get: function () {
        return facade;
      },
      teardown: function () {
        // is a no-op, for this adaptor
      }
    }
  }
};
