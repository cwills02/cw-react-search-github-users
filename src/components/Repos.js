import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = {label: language, value: 1, stars: stargazers_count}
    }
    else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // checking the language in each object and if there is no language just return from the object, if language is not null then check whether or not it is on the new object being created from the reduce function and if so create an instance with the value of 1, but if it is already on the object then keep the same instance but add 1 each time
  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value; // this is a compare function that will decide which element will come first, it helps the sort method determine which element will come first; having b.value come first arranges in desceding order, which is helpful for the pie chart
  }).slice(0, 5);

  // most stars per language

  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return { ...item, value: item.stars }
  }).slice(0,5);
  // we are taking the stars property and assigning it to the value property instead because the value is the property that the chart is looking for (ie, label, value)

  // stars, forks

  let { stars, forks } = repos.reduce((total, item) => { 
    const { stargazers_count, name, forks } = item;
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    total.forks[forks] = { label: name, value: forks }
    return total;
  },
    {
      stars: {},
      forks: {}
    })
  // using reduce and returning an object with 2 properties that are objects themselves, destructured as well from {stars, forks} = repos... 
// then in the function body we have the giant object that is the total, and from that giant object (each repo) we destructure out {stargazers_count, name, forks}, then in the object property(total.stars) we create a new property with whatever property we have here; we are overriding the stargazers_count, name, forks etc... 

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        {/* <ExampleChart data={chartData} /> */}
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
