
<?php include( 'page-components/header.php' ); ?>

<div class="page-armor">
    <div class="ov-main-container uk-container uk-container-small uk-position-relative uk-height-viewport">
        <div>
            <h1 class="uk-text-center uk-text-bold uk-text-uppercase uk-margin-large-top uk-margin-large-bottom">Armor List</h1>
        </div>
        <div class="ov-item-list">
            <table class="sticky uk-table" uk-sticky>
                <thead>
                <tr>
                    <th>Armor</th>
                    <th></th>
                    <th>ATK</th>
                    <th>DEF</th>
                    <th>Wt</th>
                    <th>PhR</th>
                    <th>ElR</th>
                    <th>RcR</th>
                    <th></th>
                    <th>Lv</th>
                </tr>
                </thead>
            </table>
            <table id="itemList" class="uk-table uk-margin-remove-top">
                <thead>
                <tr class="divide-header">
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
            </table>

            <!--<div id="loading" uk-modal>-->
            <!--<div class="frame uk-position-center">-->
            <!--<span id="progress"></span>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>

    <div id="sidePanel" class="armor-panel">
        <div class="panel">
            <button id="panelClose"></button>
            <div class="content">
                <div class="title uk-width-1-1">
                    <div class="uk-float-right uk-text-right">
                        <span class="level">—</span><br>
                    </div>
                    <h2>—</h2>
                    <h5><span class="uk-icon"><img data-src="" uk-img></span> <i>—</i></h5>
                </div>
                <div class="stats-top uk-width-1-1">
                    <div class="basic uk-grid-collapse" uk-grid>
                        <div class="uk-width-1-2">
                            <ul>
                                <li class="group"><span>Type: </span><b>—</b></li>
                                <li class="scaling"><span>Scaling: </span><b>—</b></li>
                                <li class="attack"><span>Attack: </span><b>—</b></li>
                                <li class="accuracy"><span>Accuracy: </span><b>—</b></li>
                            </ul>
                        </div>
                        <div class="uk-width-1-2 uk-text-right">
                            <ul>
                                <li class="weight"><span>Weight: </span><b>—</b></li>
                                <li class="rtcost"><span>RT Cost: </span><b>—</b></li>
                                <li class="range"><span>Range: </span><b>—</b></li>
                            </ul>
                        </div>
                    </div>
                    <div class="damage uk-grid-collapse" uk-grid>
                        <div class="damage-type uk-width-1-3">
                            <img data-src="img/icons/damage-pierce.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="damage-element uk-width-1-3">
                            <img data-src="img/icons/damage-air.png" width="40" height="40" uk-img>
                        </div>
                        <div class="damage-race uk-width-1-3">
                            <img data-src="img/icons/damage-human.png" width="40" height="40" uk-img>
                            <br>
                            <b>40%</b>
                        </div>
                    </div>
                    <div class="on-hit">
                        <table>
                            <tr>
                                <td>
                                    <span>On Hit: </span>
                                </td>
                                <td>
                                    <small><b class="on-hit-eff">—</b></small>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr>
                <div class="stats-bottom uk-width-1-1">
                    <div class="uk-grid-collapse" uk-grid>
                        <div class="uk-width-1-2">
                            <ul>
                                <li><span>ATK: </span><b>—</b></li>
                                <li><span>DEF: </span><b>—</b></li>
                                <li class="obsatk"><span>Obstacle ATK: </span><b>—</b></li>
                                <li><span class="uk-margin-small-top">HP: </span><b>—</b></li>
                                <li><span>MP: </span><b>—</b></li>
                                <li><span class="uk-margin-small-top">Luck: </span><b>—</b></li>
                            </ul>
                        </div>
                        <div class="uk-width-1-2 uk-text-right">
                            <ul>
                                <li><span>STR: </span><b>—</b></li>
                                <li><span>VIT: </span><b>—</b></li>
                                <li><span>DEX: </span><b>—</b></li>
                                <li><span>AGI: </span><b>—</b></li>
                                <li><span>AVD: </span><b>—</b></li>
                                <li><span>INT: </span><b>—</b></li>
                                <li><span>MND: </span><b>—</b></li>
                                <li><span>RES: </span><b>—</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="stats-resists uk-width-1-1">
                    <div class="uk-grid-collapse uk-flex-center" uk-grid>
                        <div class="resist-crush uk-width-1-5">
                            <img data-src="img/icons/damage-crush.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-slash uk-width-1-5">
                            <img data-src="img/icons/damage-slash.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-pierce uk-width-1-5">
                            <img data-src="img/icons/damage-pierce.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                    </div>

                    <div class="uk-grid-collapse uk-flex-center" uk-grid>
                        <div class="resist-air uk-width-1-5">
                            <img data-src="img/icons/damage-air.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-earth uk-width-1-5">
                            <img data-src="img/icons/damage-earth.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-lightning uk-width-1-5">
                            <img data-src="img/icons/damage-lightning.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-water uk-width-1-5">
                            <img data-src="img/icons/damage-water.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                    </div>
                    <div class="uk-grid-collapse uk-margin-remove-top uk-flex-center" uk-grid>
                        <div class="resist-fire uk-width-1-5">
                            <img data-src="img/icons/damage-fire.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-ice uk-width-1-5">
                            <img data-src="img/icons/damage-ice.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-light uk-width-1-5">
                            <img data-src="img/icons/damage-light.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-dark uk-width-1-5">
                            <img data-src="img/icons/damage-dark.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                    </div>

                    <div class="uk-grid-collapse uk-flex-center" uk-grid>
                        <div class="resist-human uk-width-1-5">
                            <img data-src="img/icons/damage-human.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-beast uk-width-1-5">
                            <img data-src="img/icons/damage-beast.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-reptile uk-width-1-5">
                            <img data-src="img/icons/damage-reptile.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-dragon uk-width-1-5">
                            <img data-src="img/icons/damage-dragon.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-divine uk-width-1-5">
                            <img data-src="img/icons/damage-divine.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-umbra uk-width-1-5">
                            <img data-src="img/icons/damage-umbra.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-faerie uk-width-1-5">
                            <img data-src="img/icons/damage-faerie.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-phantom uk-width-1-5">
                            <img data-src="img/icons/damage-phantom.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="resist-golem uk-width-1-5">
                            <img data-src="img/icons/damage-golem.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="stats-extra uk-width-1-1">
                    <ul>
                        <li><span>Skill Bonus: </span><b class="skillbon">—</b></li>
                        <li><span>Passive Bonus: </span><b class="passive">—</b></li>
                        <li><span>Use Effect: </span><b class="ability">—</b></li>
                        <li class="itemset"><span>Equipment Set: </span><b>—</b></li>
                    </ul>
                </div>
                <hr>
                <div class="notes uk-width-1-1">
                    <table>
                        <tr>
                            <td>
                                <span>Obtain: </span>
                            </td>
                            <td>
                                <small><b class="location">—</b></small>
                            </td>
                        </tr>
                        <tr class="ingredients">
                            <td colSpan="2">
                                <ul uk-accordion>
                                    <li>
                                        <a class="uk-accordion-title" href="#">Ingredients</a>
                                        <div class="uk-accordion-content">
                                            <ul>
                                                <li><span>Skill Bonus</span><b>x2</b></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr class="note">
                            <td>
                                <span>Notes: </span>
                            </td>
                            <td>
                                <small><b>—</b></small>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="class uk-width-1-1">
                    <ul uk-accordion>
                        <li>
                            <a class="uk-accordion-title" href="#">Class List</a>
                            <div class="uk-accordion-content">
                                <ul>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/armor.js" type="text/javascript"></script>

<?php include( 'page-components/footer.php' ); ?>
