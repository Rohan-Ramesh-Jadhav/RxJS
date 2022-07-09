import { Observable, Subscription } from "rxjs";

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