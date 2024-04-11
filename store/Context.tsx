Context
  health
  money
  happy
  smart
  events Array<Event>
  activities Array<Activity>

  function setHealth(num: number)
  end

  function setMoney(num: number)
  end

  function setHappy(num: number)
  end

  function appendEvent()
  end
end


Component App
	<ContextProvider>
		<GameLoop />
	</ContextProvider>
end

import {GameContext} from '../store/GameContext.ts';
import {useEffect} from 'react';
import {floor, random} from 'Math';

function GameLoop() {
	const context = useContext(GameContext); 
	cont timer = useRef(setInterval(() => {}, 3000));

	useEffect(() => {
		clearInterval(timer.current);
		
		timer.current = setInterval(() => {
            const randInt = (floor(random() * 10)) // a random number in range [0, 9]

           if ( [0,9].include(randInt)	) {
                    randIndex = floor(random() * 10);
                    event = events[randIndex];
                    setHealth((current) => current - event.healthEffect);
                    setMoney((current) => current - event.moneyEffect);
           }

           if (health <= 0) {
                    clearInterval(timer.curreth);
           }

          if (money <= 0) {
                    setHealth((current) => current * 0.9)
          }

	}, 3000);
	}, []);
	
	return (<></>);
}

function getAvailableEvent(happenings: Event[], all: Event[]): Event[] {
	// filter and return event that are not in happenings
	return all.filter((eve) => false == happenings.includes(eve));
}