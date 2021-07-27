<div class="container py-4 py-md-5" data-v-35d2201b="">
  <div class="row" data-v-41c4a2b0="" data-v-3df67127="" data-v-35d2201b="" style="<?= ($data['align'] ?? 'left') === 'right' ? 'flex-direction: row-reverse' : '' ?>">
    <div class="col-lg-6 ml-auto mt-5 mt-lg-0 order-1 order-lg-0" data-v-41c4a2b0="">
      <div class="position-relative mx-auto img-yellow-shadow" data-v-41c4a2b0="">
        <?php if ($data['image'] ?? null): ?>
        <img data-sizes="auto" src="<?= $data['image'] ?>" alt=""
             class="position-relative z-10 img-fluid lazyautosizes ls-is-cached lazyloaded"
                                                                                       data-v-41c4a2b0="" sizes="425px">
        <?php endif ?>
        <p class="position-relative z-10 mt-3 mb-0 text-center bold" data-v-41c4a2b0="">
          <?= $data['caption'] ?? '' ?>
        </p></div>
    </div>
    <div class="col-lg-6 mr-auto" data-v-41c4a2b0="">
      <h2 class="h2 mb-lg-7 mb-0" style="flex-basis:auto;">
        <?= $data['title'] ?? '' ?>
      </h2>
      <ul class="list-steps mx-md-auto mx-lg-0 mt-4" data-v-41c4a2b0="">
        <?php foreach(($data['steps'] ?? []) as $step): ?>
        <li class="list-steps_item" data-v-41c4a2b0="">
          <?= $step['step'] ?? '' ?>
        </li>
        <?php endforeach ?>
      </ul>
    </div>
  </div>
</div>
