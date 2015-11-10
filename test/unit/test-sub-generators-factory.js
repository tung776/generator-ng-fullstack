import {expect} from 'chai';
import sinon from 'sinon';
import knownPaths from '../../_ng/utils/known_paths';
import utils from '../../_ng/utils/utils';

import {FactorySubGenerator} from '../../_ng/client/sub_generators_factory';

describe('FactorySubGenerator', () => {
  describe('creation', () => {
    it('should have the right param passed to wrapper', () => {
      let _gen = {
        a: true,
        config: {
          get(){ return 'ng1'}
        }
      };
      let _fsg = new FactorySubGenerator(_gen);

      expect(_fsg.wrapper).to.equal(_gen);
    });
  });

  describe('initializing', () => {
    it('should have the initializing called with the right stuff', () => {
      let _gen = {
        argument(){},
        config: {
          get(){return 'ng1'}
        }
      };

      sinon.mock(_gen.argument);

      let _fsg = new FactorySubGenerator(_gen);

      _fsg.initializing();

      expect(_fsg.wrapper.argument).to.have.been.called;
    });
  });

  describe('writing', () => {
    describe('ng1', () => {
      it('should have the initializing called with the right stuff', () => {
        let _gen = {
          name: 'a',
          options: {feature: 'c'},
          config: {
            get() {return 'ng1'}
          },
          template: sinon.spy()
        };

        sinon.mock(_gen.template);

        let _fsg = new FactorySubGenerator(_gen);

        _fsg.writing();

        let _firstCall = ['ng1/factory.js', knownPaths.PATH_CLIENT_FEATURES + _gen.options.feature + '/factory/' + _gen.name + '.factory.js', {name: utils.capitalizeFirst(_gen.name)}];
        let _secondCall = ['ng1/factory_test.js', knownPaths.PATH_CLIENT_FEATURES_TEST + _gen.options.feature + '/factory/' + _gen.name + '.factory_test.js', {name: utils.capitalizeFirst(_gen.name)}];

        expect(_fsg.wrapper.writing).to.have.been.called;
        expect(_fsg.wrapper.template.calledWith(_firstCall[0], _firstCall[1], _firstCall[2])).to.be.true;
        expect(_fsg.wrapper.template.calledWith(_secondCall[0], _secondCall[1], _secondCall[2])).to.be.true;
      });
    });

    describe('ng2', () => {
      it('should have the initializing called with the right stuff', () => {
        let _gen = {
          name: 'a',
          options: {feature: 'c'},
          config: {
            get() {return 'ng2'}
          },
          template: sinon.spy()
        };

        sinon.mock(_gen.template);

        let _fsg = new FactorySubGenerator(_gen);

        _fsg.writing();

        let _firstCall = ['ng2/factory.ts', knownPaths.PATH_CLIENT_FEATURES + _gen.options.feature + '/' + _gen.name + '_factory.ts', {name: utils.capitalizeFirst(_gen.name)}];
        let _secondCall = ['ng2/factory_test.ts', knownPaths.PATH_CLIENT_FEATURES_TEST + _gen.options.feature + '/' + _gen.name + '_factory_test.ts', {name: utils.capitalizeFirst(_gen.name)}];

        expect(_fsg.wrapper.writing).to.have.been.called;
        expect(_fsg.wrapper.template.calledWith(_firstCall[0], _firstCall[1], _firstCall[2])).to.be.true;
        expect(_fsg.wrapper.template.calledWith(_secondCall[0], _secondCall[1], _secondCall[2])).to.be.true;
      });
    });
  });
});
