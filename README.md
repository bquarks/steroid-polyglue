# steroid-polyglue

Polyglue is used to broadcast payloads to registered callbacks, a way of comunication between components. 

### API

##### register(function callback): string

Registers a callback to be invoked with every dispatched payload. Returns a token that can be used with `dispatchOne()` and `waitFor()`.

##### unregister(string id): void

Removes a callback based on its token.

##### waitFor(array<string##### ids): void

Waits for the callbacks specified to be invoked before continuing execution of the current callback. This method should only be used by a callback in response to a dispatched payload.

##### dispatch(object payload): void

Dispatches a payload to all registered callbacks.

##### dispatchOne(string id, string name, string target, string from, object data) : void

Dispatches a payload to specific registered callbacks.


##### isDispatching(): boolean

Is this Dispatcher currently dispatching.



## Example

```javascript

    var Polyglue = document.querySelector('steroid-polyglue');

    var id = Polyglue.register(function(payload){
        console.log('hello!', payload);
    });

    // Dispatch a specific callback
    Polyglue.dispatchOne(id,'name:event', 'target:foo','from:bar' ,{ foo : 'bar'});


    // Dispatch to all registered callbacks
    Polyglue.dispatch({foo : 'bar', name : 'John Doe'});

```



## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). You can
install that via:

    npm install -g bower

Then, go ahead and download the element's dependencies:

    bower install


## Playing With Your Element

If you wish to work on your element in isolation, we recommend that you use
[Polyserve](https://github.com/PolymerLabs/polyserve) to keep your element's
bower dependencies in line. You can install it via:

    npm install -g polyserve

And you can run it via:

    polyserve

Once running, you can preview your element at
`http://localhost:8080/components/steroid-polyglue/`, where `steroid-polyglue` is the name of the directory containing it.


## Testing Your Element

Simply navigate to the `/test` directory of your element to run its tests. If
you are using Polyserve: `http://localhost:8080/components/steroid-polyglue/test/`

### web-component-tester

The tests are compatible with [web-component-tester](https://github.com/Polymer/web-component-tester).
Install it via:

    npm install -g web-component-tester

Then, you can run your tests on _all_ of your local browsers via:

    wct

#### WCT Tips

`wct -l chrome` will only run tests in chrome.

`wct -p` will keep the browsers alive after test runs (refresh to re-run).

`wct test/some-file.html` will test only the files you specify.
