const ccav = require('./ccavutil.js')
export default function (req, res) {
    let workingKey = '0E3C7C18D465713163159A1A5E8AE19A';
    let ccavResponse = ccav.decrypt("5785acd421d823e9b3f778eb85e7c53e923e8f5db06f12b0ecea8c2769c27aec9313c11e5fa468ca981b3fbffb6ce2e854251d7738bed83d8baedec3632cdd3c58c062c4ecd4e236d749a880101e078f8ab99c3a85a5fcf5513d6571ff94942102f0f6302c230cf686839b6be590143056a124089f5bc810c8face5d871e7072bcdd43e309dd5e091ce420f2c95fa27a033d98c3f92e821a89725772fc992eb89dddd73174721e2b9620be5f6608bf2bb07eb82ad453fb0740e527966a0ac161a6d8a709f027e4454211664dba6f6065160a2d921b2d3aa0e94aeb8265ae5c8688f3fdc792eaea3b965bc7463861f16aa8ed073de3841b1690171988db81f45d6573aa3d469929cdde45aaaca94e171b82f7acd88b48e80813fec3118ba52cc9fe5a4bc933413a9a38030dc82d24db740ab603002232390dfddc95e05dd519d182db58a19aaf4cf9f2268079a7055a01f88a79c5e2678b1925e857cb391aeebc5bf26969d4b8533878d0fffbaec4e63c3cc47bdd96870d87047c4f473822cbf3c224ce33de6eb8711e462e899d465a32193c5fc8a76f44f93d9af0b409deafa83d18feaea468455309538d1733873c7cd84a6c9c366fd8525aaf8ff2b537731191a589146bd1331cc5c85e596b0e460c7149a1fe24a6498d8f9790f6806a477eebf9c946e00cbe79d2d30465d74e93302cc2e8ccbe8c015ee2cfa7adaf688f2c8d73da060cc649782ad4d0b061bf9f12108caf9dbf0ab5211f8c98c61f94aaae62de7dae8085c15597df5f94b733ca16ded444f8232e4cb536c0fdfce45ff33a77f98870cef02eadfa02695896553825849623ae9d194152cf308af0d74d81c1100f82a0459775b9ccc54e732292136650fd1a6d3308d56f855a3f903dc9692a8cc5e3c4469be50fcd994d6ffbd0f3e4811e5da136bdf92c1ba291d0872c66e91ebfdbcd8bd3f8976a58ba7b4e6aa1db83ff6be8ef22f92dbf6e4da1d3ac832ceb1e9f71eb1e8037c647a2ffc4452da5127d9a10dd7d3010c9792347e8f34ff54645e4cddecd940f1791603d3370bceeb5f1b40d399c7867905fac01b7a3bac98cfa9c12ac5401ff5b303c4878f14c5d5bc3c58035d2c7b62d79524e5ba7cb47084496e38985f2f5c0525c688f45394f89193585f40ff2650dd36100f75db728fcc4184917d9adb5dccbcb771ecf866fe7aca8dcc688d7311e030c70ccc6899c0eb726fa9125adc0277d9eed4f15fba766ff0da9f003d037c0ea75f2313207d722f9d80694bf43484627cf5e8c36c3e8925dea2a0bf0b18575802332e7ea20538d2fb19d543ad6627336ff6c07f09dbf94afa79c055ec6102998367878abe3821ab385d4d0a89ee3c48560d09c74918a9909a613c98d50a2b394516861aa2f6155953f7ec78733299d7052e966018355ee5ae99109081fe60f822a5d98a1411693211ff798b915fb05ff3f0629d46ba703ebeab34736721d0c4b4c0813b8a248", workingKey);
    console.log("🚀 ~ file: test.js ~ line 5 ~ ccavResponse", ccavResponse)
    res.send(ccavResponse)
}

