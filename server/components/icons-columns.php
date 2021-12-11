<div class='bloc' style="<?= dataToStyle($data) ?>">
<div class='container'>
    <div class="d-flex py-<?= $data['padding'] ?? 3 ?> justify-content-center" style='gap: 2rem;'>
      <?php foreach($data['icons'] as $item): ?>
        <div style='max-width: 430px;'>
            <div class="feature-icon bg-primary bg-gradient mb-4 d-inline-flex justify-content-center align-items-center" style='display: inline-flex; width: 4rem; height: 4rem; border-radius: .75rem; color: #FFF;'>
              <svg class="bi" viewBox="0 0 16 16" width="1em" height="1em">
                <path fill='currentColor' d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"></path>
              </svg>
            </div>
            <h2>Featured title</h2>
            <p class='text-muted'>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
            <a href="#" class="icon-link">
                Call to action
                <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
            </a>
        </div>
      <?php endforeach; ?>
    </div>
</div>
</div>
