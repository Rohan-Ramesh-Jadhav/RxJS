import { Observable, interval, timer, fromEvent, from, of } from "rxjs";
import { map, pluck, filter, reduce } from "rxjs/operators";

const obs = new Observable((subscriber)=>{
    subscriber.next('Hello World')
    subscriber.next('second set of data stream')
    let sub = setInterval('console.log("leake");',1000);
    // subscriber.complete()
    return ()=>{clearInterval(sub)}
});

const subscription1 = obs.subscribe({
    next: (value)=>{
        console.log(value);
    },
    complete: ()=>{
        console.log('terminated')
    },
    error: (err)=>{
        console.log(err)
    }
})

setTimeout(()=>{subscription1.unsubscribe();},2000)

//example for interval
// this will emit the data per second
const inter = interval(1000)

const interObj = inter.subscribe(
    console.log
);

setTimeout(()=>{
    console.log('closed intervel operator')
    interObj.unsubscribe()
},4000)

//timer operator example
const timerDemo = timer(1000,1000);

const timerObj = timerDemo.subscribe(
    console.log
)

setTimeout(()=>{
    console.log('timer operator will terminated')
    timerObj.unsubscribe();
},4000)

//from event operator demo
const fromEventListener = fromEvent(
    document,
    'click'
)

const fromEventListenerObj = fromEventListener.subscribe(
    console.log
)

//fromEventListenerObj.unsubscribe();

//of operator example
const ofDemo = new of(
    [1,2],
    [2,3,4],
    [10,20,30,40]
)

const ofDemoObj = ofDemo.subscribe({
    next: (response)=>{
        console.log('of: '+response)
    }
})

ofDemoObj.unsubscribe();

//for operator 
const fromDemo = new from(
    [1,2,3,4]
)

const fromObj = fromDemo.subscribe({
    next: (result)=>{
        console.log('from: '+result)
    }
})

//demo for the map operator
const ofObservable = new of(1,2,3,4,5)

const firstPipableObservable = ofObservable.pipe(
    map((value)=> `$${value}`)
)

const mapOperator = firstPipableObservable.subscribe({
    next: (result)=>{
        console.log('map: '+result);
    }
})

//pluck operator demo
const fromEventObserver = new fromEvent(
    document, 'keydown'
).pipe(
    pluck('code')
)

const pluckSubscriber = fromEventObserver.subscribe({
    next: (result)=>{ console.log('pluck: '+result); }
})

//filter operator demo
const filterObservable = new of(1,2,3,4,10,6,20,40).pipe(
    filter((val)=>val>=6)
)

const filterSubscriber = filterObservable.subscribe({
    next: (result)=>{ console.log('filter: '+result) }
})

//reduce operator demo
const reduceObservable = new of(1,2,3,4,5).pipe(
    reduce(
        (acc,val)=>acc + val,
        0
    )
)

const reduceSubscriber = reduceObservable.subscribe({
    next: result => console.log('reduce :'+result)
})