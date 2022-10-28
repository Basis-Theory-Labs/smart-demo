import { useEffect, useState } from 'react';
import Chance from 'chance';
import { Cart } from '@/types';

const chance = new Chance();

/**
 * Generates a ISO 8601 String
 * of a date 1 hour from now.
 */
const ttl = (): string => new Date(Date.now() + 60 * 60 * 1000).toISOString();

const generateCardId = () =>
  `card_${chance.string({
    length: 24,
    alpha: true,
    numeric: true,
  })}`;

const policies = ['Premium', 'Standard', 'Basic'];

const generatePolicy = () => ({
  type: chance.pickone(policies),
  value: chance.integer({
    min: 100,
    max: 2000,
  }),
});

const useCart = (): {
  cart: Cart;
  refresh: () => void;
} => {
  const [name, setName] = useState('');
  const [homePolicy, setHomePolicy] = useState({
    type: '',
    value: 0,
  });
  const [autoPolicy, setAutoPolicy] = useState({
    type: '',
    value: 0,
  });

  const refresh = () => {
    setName(chance.name());
    setHomePolicy(generatePolicy());
    setAutoPolicy(generatePolicy());
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    cart: {
      name,
      homePolicyType: homePolicy.type,
      homePolicyValue: homePolicy.value,
      autoPolicyType: autoPolicy.type,
      autoPolicyValue: autoPolicy.value,
    },
    refresh,
  };
};

export { ttl, useCart, generateCardId };
