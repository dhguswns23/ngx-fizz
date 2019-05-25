<h1 align="center">
  <img width="350" src="/assets/documentations/fizz-logo.png">

</h1>
<h3 align="center">Rich Animated Icon set for AngularIO operated by <a href="https://github.com/juliangarnier/anime">animeJS</a></h3>
<p align="center">
  <a href="http://fizz.ohjun.me"><img src="https://img.shields.io/badge/npm-6.1.0-blue.svg"></a>
  <a href="http://fizz.ohjun.me"><img src="https://img.shields.io/badge/version-0.1.0--alpha-green.svg"></a>
  <a href="http://fizz.ohjun.me"><img src="https://img.shields.io/badge/angular-7.0-red.svg"></a>
</p>

<h2>Index</h2>
<ul>
  <li><a href="#prerequisities">Prerequisities</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#quick-start">Quick start</a></li>
  <li><a href="#browser-support">Browser support</a></li>
  <li><a href="#license">License</a></li>
</ul>

## Prerequisities

There are not many prerequisites to use Fizz.

- Angular 7 or later
- And prerequisites for using Angular
- Array and Object polyfills

If your project is on angular 7 or later, you can easily use Fizz. Also we are gradually increase angular version support.

## Installation

You can install Fizz very easily and quick.

```bash
$ npm intsall ngx-fizz --save
```

You just install Fizz using npm. Now, we are all set to use Fizz!

## Quick start

### Very first start

Let's start Fizz with quick start example.

First, import FizIconSetModule to module which you want to use Fizz.

```typescript
import { FizzIconSet } from ‘fizz’;

@NgModule({
	imports: [
		FizzIconSet,
	],
})
export class SomeModule {}
```

Second, insert Fizz tag to angular template.

```html
<fiz-check [state]=’ShowHideState.SHOW’></fiz-check>
```

You can check available [Icons](http://fizz.ohjun.me/icons) and its @Inputs, @Outputs, and @Methods.

### Separate Import

On above example, we use `FizIconSetModule` to use `FizCheckIconComponent`. However `FizIconSetModule` export all icon components Fizz provides, we can easily use every fizz icons but it makes module heavy. Therefore when you want to optimize your angular module, then you have to import icons separately like below.

For the case of `FizCheckIcon` , You just import `FizCheckIconModule` where you want to use.

```typescript
import { FizCheckModule } from ngx-fizz;

@NgModule({
    imports: [
        FizCheckModule,
    ],
})
export class SomeModule {}
```

You can check other module's name on [Icons](http://fizz.ohjun.me/icons).

### Complicate Animation

Let's go one more step. Now we make check icon show and then hide when show animation end.

```html
<fiz-check (click)="onIconClick()" #checkIcon></fiz-check>
```

```typescript
export class SomeComponent {
    @ViewChild('checkIcon') public checker: FizCheckIconComponent,
    
    public onIconClick() {
        const { checker } = this;
        checker.hide();
        checker.show();
    }
```

Does it work collectly?

The reason why animation doesn't work as you intend is that every Fizz icons animate asynchronously (how animejs works). To solve this problem, you need to use 'Promise chain'. So do we need to use 'Promise'? Yes, But you don't need to create 'Promise object' since Fizz provides `FizFlow` and `FizFlowFunction` (of course, it use Promise internally). Then let's use these.

First, import `FizFlow` and `FizFlowFunction`.

```typescript
import { FizFlow, FizFlowFunction } from 'ngx-fizz';
```

Second, declare FizFlow object with an array of FizFlowFunction that contains sequence of animation. Here, FizFlowFunction constructor receives two arguments, first argument is animation target component and second is method name which return promise.

```typescript
public onIconClick() {
        const { checker } = this;

        const flow = new FizFlow([
            new FizFlowFunction<FizCheckComponent>(checker, 'hide'),
            new FizFlowFunction<FizCheckComponent>(checker, 'show'),
        ]);
        flow.run();
    }
```

Now you have icon which has animation chain.

## API references

Will be added soon!

## Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## License

The MIT License Copyright (c) 2019 dhguswns23

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
