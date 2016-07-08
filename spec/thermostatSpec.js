'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increases in temperature with the up button', function() {
    thermostat.increaseTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('decreases in temperature with the down button', function() {
  	thermostat.decreaseTemperature();
  	expect(thermostat.getCurrentTemperature()).toEqual(19);
	});

  it('has a minimum of 10 degrees', function() {
    for (var i = 0; i < 11; i++) {
    thermostat.decreaseTemperature();
  }
  expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('has power saving mode on by default', function() {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switch PSM off', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });


  describe('when power saving mode is on', function() {
    it('has a maximum temperature of 25 degrees', function() {
      for (var i = 0; i < 6; i++) {
       thermostat.increaseTemperature();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
  });

  describe('when power saving mode is off', function() {
    it('has a maximum temperature of 32 degrees', function() {
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.increaseTemperature();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  describe('resets to default temperature', function() {
    it('resets temperature to 20 degrees', function(){
      thermostat.increaseTemperature();
      thermostat.reset();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('displays color based on energy usage', function(){
    it ('displays green if temp is below 18', function(){
        for (var i = 0; i < 4; i++) {
        thermostat.decreaseTemperature();
        }
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });
    it ('displays blue if temp is between 18 and 25', function(){
      expect(thermostat.energyUsage()).toEqual('medium-usage');
    });

    it ('displays red if temp is above 25', function(){
        for (var i = 0; i < 6; i++) {
        thermostat.increaseTemperature();
        }
      expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });
});
